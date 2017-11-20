package com.example.angularspring.repositories;

import com.example.angularspring.repositories.utils.GroupByEntry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.angularspring.entities.Customer;

import java.util.List;

//CrudRepository<Resource, ID>
public interface CustomerRepository extends CrudRepository<Customer, Long> {

	@Transactional
	void deleteById(Integer id);
	//deprecated
    @Query("select count(p) from Customer c join c.products p on p.id = :id")
    Integer countCustomersByProductId(@Param("id") Integer id);

    @Query("select new com.example.angularspring.repositories.utils.GroupByEntry(c.firstname, sum(p.price)) from Customer c join c.products p group by c.id")
    List<GroupByEntry<String, Double>> productsPricesSum();

    @Query("select new com.example.angularspring.repositories.utils.GroupByEntry(c.firstname, count(p)) from Customer c join c.products p group by c.id")
    List<GroupByEntry<String, Integer>> countAllByProducts();
}
