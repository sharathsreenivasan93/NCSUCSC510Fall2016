package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class SeleniumTesting
{
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	
	// Database - Happy Flow
	
	@Test
	public void DatabaseHF() throws InterruptedException
	{
		// Introductory message - Hi!
		
		TimeUnit.SECONDS.sleep(3);
		
		
		// User selects the option - 'Database'
		
		WebElement messageBotDB = driver.findElement(By.id("message-input"));
		messageBotDB.sendKeys("database");
		messageBotDB.sendKeys(Keys.RETURN);
		
		TimeUnit.SECONDS.sleep(3);
		
		// User provides the Team Name
		
		WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
		messageBotTeamName.sendKeys("CSC510");
		messageBotTeamName.sendKeys(Keys.RETURN);
		
		TimeUnit.SECONDS.sleep(3);
		
		// User provides the Database name
		
		WebElement messageBotDBName = driver.findElement(By.id("message-input"));
		messageBotDBName.sendKeys("oracle.csc510");
		messageBotDBName.sendKeys(Keys.RETURN);
		
		TimeUnit.SECONDS.sleep(3);
		
		// User confirms -'YES'; Bot provides access to the user & sends appropriate message.
		
		WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
		messageBotConfirm.sendKeys("Yes");
		messageBotConfirm.sendKeys(Keys.RETURN);
				
		WebElement msgFour = driver.findElement(
						By.xpath("//span[@class='message_body' and text() = 'You have been given access to the database oracle.csc510']"));
		String messageFour = msgFour.getText();
		System.out.println(messageFour);
		assertNotNull(messageFour);
		
		
	}

//Database - Alternate Flow
@Test
public void DatabaseAF() throws InterruptedException
{
	TimeUnit.SECONDS.sleep(3);
	
	
	// User selects the option - 'Database'
	
	WebElement messageBotDB = driver.findElement(By.id("message-input"));
	messageBotDB.sendKeys("database");
	messageBotDB.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Team Name
	
	WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
	messageBotTeamName.sendKeys("CSC510");
	messageBotTeamName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Database name
	
	WebElement messageBotDBName = driver.findElement(By.id("message-input"));
	messageBotDBName.sendKeys("oracle.csc510");
	messageBotDBName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User says 'No'; Bot cancels the request.
	
	WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
	messageBotConfirm.sendKeys("No");
	messageBotConfirm.sendKeys(Keys.RETURN);
			
	WebElement msgFour = driver.findElement(
					By.xpath("//span[@class='message_body' and text() = 'I am canceling the current request']"));
	String messageFour = msgFour.getText();
	System.out.println(messageFour);
	assertNotNull(messageFour);
	
	TimeUnit.SECONDS.sleep(3);
	
}
@Test
public void SoftwareHF() throws InterruptedException
{
	// Introductory message - Hi!
	
	TimeUnit.SECONDS.sleep(3);
	
	// User selects the option - 'Software'
	
	WebElement messageBotDB = driver.findElement(By.id("message-input"));
	messageBotDB.sendKeys("Software");
	messageBotDB.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Team Name
	
	WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
	messageBotTeamName.sendKeys("CSC540");
	messageBotTeamName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the software name
	
	WebElement messageBotDBName = driver.findElement(By.id("message-input"));
	messageBotDBName.sendKeys("MySQL");
	messageBotDBName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User confirms -'YES'; Bot provides access to the user & sends appropriate message.
	
	WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
	messageBotConfirm.sendKeys("Yes");
	messageBotConfirm.sendKeys(Keys.RETURN);
			
	WebElement msgFour = driver.findElement(
					By.xpath("//span[@class='message_body' and text() = 'Software/Package JDK has been installed on your development environment 192.168.23.35']"));
	String messageFour = msgFour.getText();
	System.out.println(messageFour);
	assertNotNull(messageFour);
	
	
}

//Github - Alternate Flow
@Test
public void SoftwareAF() throws InterruptedException
{
	driver.get("https://csc510-seproject.slack.com");

	// Wait until page loads and we can see a sign in button.
	WebDriverWait wait = new WebDriverWait(driver, 30);
	wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

	// Find email and password fields.
	WebElement email = driver.findElement(By.id("email"));
	WebElement pw = driver.findElement(By.id("password"));

	// Type in our test user login info.
	email.sendKeys("kaushi@ncsu.edu");
	pw.sendKeys("*******");

	// Click
	WebElement signin = driver.findElement(By.id("signin_btn"));
	signin.click();

	// Wait until we go to general channel.
	wait.until(ExpectedConditions.titleContains("general"));

	// Switch to #bots channel and wait for it to load.
	driver.get("https://csc510-seproject.slack.com/messages/@onboarding-bot/");
	wait.until(ExpectedConditions.titleContains("onboarding-bot"));

	// Introductory message - Hi!
	WebElement messageBotIntro = driver.findElement(By.id("message-input"));
	messageBotIntro.sendKeys("@onboarding-bot Hi");
	messageBotIntro.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User selects the option - 'Software'
	
	WebElement messageBotDB = driver.findElement(By.id("message-input"));
	messageBotDB.sendKeys("Software");
	messageBotDB.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Team Name
	
	WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
	messageBotTeamName.sendKeys("CSC540");
	messageBotTeamName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the software name
	
	WebElement messageBotDBName = driver.findElement(By.id("message-input"));
	messageBotDBName.sendKeys("MySQL");
	messageBotDBName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User says 'No'; Bot cancels the request.
	
	WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
	messageBotConfirm.sendKeys("No");
	messageBotConfirm.sendKeys(Keys.RETURN);
			
	WebElement msgFour = driver.findElement(
					By.xpath("//span[@class='message_body' and text() = 'I am canceling the current request']"));
	String messageFour = msgFour.getText();
	System.out.println(messageFour);
	assertNotNull(messageFour);
	
	TimeUnit.SECONDS.sleep(3);

}

// Github - Happy Flow

@Test
public void GithubHF() throws InterruptedException
{
	// Introductory message - Hi!
	TimeUnit.SECONDS.sleep(3);
	
	// User selects the option - 'Github'
	
	WebElement messageBotDB = driver.findElement(By.id("message-input"));
	messageBotDB.sendKeys("Github");
	messageBotDB.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Team Name
	
	WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
	messageBotTeamName.sendKeys("CSC517");
	messageBotTeamName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Repo name
	
	WebElement messageBotDBName = driver.findElement(By.id("message-input"));
	messageBotDBName.sendKeys("designpatterns");
	messageBotDBName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User confirms -'YES'; Bot provides access to the user & sends appropriate message.
	
	WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
	messageBotConfirm.sendKeys("Yes");
	messageBotConfirm.sendKeys(Keys.RETURN);
			
	WebElement msgFour = driver.findElement(
					By.xpath("//span[@class='message_body' and text() = 'You have been added as an collaborator for the repository designpatterns']"));
	String messageFour = msgFour.getText();
	System.out.println(messageFour);
	assertNotNull(messageFour);
	
	
}

//Github - Alternate Flow
@Test
public void GithubAF() throws InterruptedException
{

	// Introductory message - Hi!
	
	TimeUnit.SECONDS.sleep(3);
	
	// User selects the option - 'Github'
	
	WebElement messageBotDB = driver.findElement(By.id("message-input"));
	messageBotDB.sendKeys("Github");
	messageBotDB.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Team Name
	
	WebElement messageBotTeamName = driver.findElement(By.id("message-input"));
	messageBotTeamName.sendKeys("CSC517");
	messageBotTeamName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User provides the Repo name
	
	WebElement messageBotDBName = driver.findElement(By.id("message-input"));
	messageBotDBName.sendKeys("designpatterns");
	messageBotDBName.sendKeys(Keys.RETURN);
	
	TimeUnit.SECONDS.sleep(3);
	
	// User says 'No'; Bot cancels the request.
	
	WebElement messageBotConfirm = driver.findElement(By.id("message-input"));
	messageBotConfirm.sendKeys("No");
	messageBotConfirm.sendKeys(Keys.RETURN);
			
	WebElement msgFour = driver.findElement(
					By.xpath("//span[@class='message_body' and text() = 'I am canceling the current request']"));
	String messageFour = msgFour.getText();
	System.out.println(messageFour);
	assertNotNull(messageFour);
	
	TimeUnit.SECONDS.sleep(3);

}}



