package com.ecommerce.backendecommerce.dao;

import com.ecommerce.backendecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("*")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //Query methode(findBy) Match by CategoryId
    //SELECT*FROM product where category_id = ?
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    //SELECT * FROM product p WHERE p.name LIKE CONCAT('%', :name , '%')
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);





}
