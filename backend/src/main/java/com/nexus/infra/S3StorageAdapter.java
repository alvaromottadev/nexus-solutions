package com.nexus.infra;

import com.nexus.ports.StoragePort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.net.URI;

@Component
public class S3StorageAdapter implements StoragePort {

    private final S3Client s3Client;

    private final String bucketName;

    private final String region;

    private final String url;

    public S3StorageAdapter(@Value("${aws.access.key}") String accessKey,
                            @Value("${aws.secret.access.key}") String secretKey,
                            @Value("${storage.url}") String url,
                            @Value("${aws.s3.bucket.name}") String bucketName,
                            @Value("${aws.region}") String region) {
        this.url = url;
        this.bucketName = bucketName;
        this.region = region;
        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create("http://localhost:4566"))
                .region(Region.of(region))
                .credentialsProvider(
                        StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
                )
                .serviceConfiguration(S3Configuration.builder().pathStyleAccessEnabled(true).build())
                .build();
        createBucketIfNotExists();
    }

    @Override
    public String uploadFile(byte[] fileData, String fileName, String contentType) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(contentType)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(fileData));
        return url + "/" + bucketName + "/" + fileName;
    }

    private void createBucketIfNotExists() {
        if (!s3Client.listBuckets().buckets().stream().anyMatch(bucket -> bucket.name().equals(bucketName))) {
            s3Client.createBucket(b -> b.bucket(bucketName));
        }
    }

}
