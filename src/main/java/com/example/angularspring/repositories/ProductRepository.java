package com.example.angularspring.repositories;

import com.example.angularspring.entities.Product;
import com.example.angularspring.repositories.utils.GroupByEntry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Long> {
    //deprecated
    @Query("select count(p) from Product p join p.customers c on c.id = :id")
    Integer countProductsByCustomerId(@Param("id") Integer id);

    @Query("select new com.example.angularspring.repositories.utils.GroupByEntry(p.name, count(c)) from Product p join p.customers c group by p.id")
    List<GroupByEntry<String, Integer>> countAllByCustomers();

}
