package com.pis.flatmanager;

import com.pis.flatmanager.entity.StringResponse;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FlatmanagerApplicationTests {

	public FlatmanagerApplicationTests() {

	}

	@Test
	public void contextLoads() {
	}

	@Test
	public void stringResponseTest() {
		StringResponse stringResponse = new StringResponse("test");
		Assert.assertEquals("test",  stringResponse.getResponse());
	}

}
