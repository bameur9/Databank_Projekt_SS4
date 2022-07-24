package com.ecommerce.backendecommerce;

import com.ecommerce.backendecommerce.dao.ProductCategoryRepository;
import com.ecommerce.backendecommerce.dao.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendEcommerceApplication implements CommandLineRunner {
    @Autowired
	private ProductRepository productRepository;
    @Autowired
    private ProductCategoryRepository productCategoryRepo;

	public static void main(String[] args) {
		SpringApplication.run(BackendEcommerceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
       /*
		productCategoryRepo.findAll().forEach(c ->{
			if(c.getId() == 1L){
				Product product = new Product();
				product.setId(59l);
				product.setSku("8710800850");
				product.setName("Telefunken D55V950M2CWH");
				product.setDescription("LED-Fernseher (139 cm/55 Zoll, 4K Ultra HD, Android TV, Smart-TV, Dolby Atmos, USB-Recording)");
				product.setUnitPrice(BigDecimal.valueOf(345.39));
				product.setImageUrl("assets/images/products/tv/tv-11.jpg");
				product.setActive(true);
				product.setUnitsInStock(50);
				product.setCategory(c);

				productRepository.save(product);
			}
		});
      */
	}
}
