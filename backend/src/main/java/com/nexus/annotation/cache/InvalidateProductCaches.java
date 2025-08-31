package com.nexus.annotation.cache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Caching(evict = {
        @CacheEvict(value = "products", key = "#company.id"),
        @CacheEvict(value = "products-oracle", key = "#company.id"),
        @CacheEvict(value = "products-low-stock", key = "#company.id"),
        @CacheEvict(value = "products-total-stock", key = "#company.id"),
        @CacheEvict(value = "product-quantity", key = "#company.id")
})
public @interface InvalidateProductCaches {
}
