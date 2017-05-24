package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class WebTest
{
	//driver = new HtmlUnitDriver();
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		System.setProperty("webdriver.chrome.driver", "/Users/sharathsreenivasan/Downloads/chromedriver");
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	@Test
	public void FrustrationofSoftwareDeveloper() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
		
		WebDriverWait wait = new WebDriverWait(driver, 30);
		WebElement messageSection = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(".//*[@id='dynamicStudies']/div[8]/div[2]/p/span[1]")));
		
		String message = messageSection.getText();
		int value = Integer.parseInt(message);
		
		assertEquals(55, value);
	}
	
	@Test
	public void StudiesClosed() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
		
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='status']/span[.='CLOSED']")));
		List<WebElement> spans = driver.findElements(By.xpath("//a[@class='status']/span[.='CLOSED']"));
		assertEquals(5, spans.size());
	}
	
	@Test
	public void ParticipateButton() throws Exception
	{
		int i=0;
		driver.get("http://www.checkbox.io/studies.html");
		
		WebDriverWait wait = new WebDriverWait(driver, 30);
		
		for(i = 1 ; i<=12; i++)
		{
			WebElement statusElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(".//*[@id='dynamicStudies']/div["+i+"]/div[2]/a/span")));
			String statusValue = statusElement.getText();
			
			if(statusValue == "Open")
			{
				WebElement buttonElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(".//*[@id='dynamicStudies']/div["+i+"]/div[2]/div[1]/button")));
				assertNotNull(buttonElement);
			}	
		}
	}
	
	@Test
	public void SoftwareChangesSurvey() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
	
		WebDriverWait wait = new WebDriverWait(driver, 30);
		WebElement imageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(".//*[@id='dynamicStudies']/div[12]/div[1]/div[1]/div[2]/span/img")));
		
		assertNotNull(imageElement);
	}
}
