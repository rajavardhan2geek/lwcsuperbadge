public class AccountUtils {

    public static List<Account> accountsByState(String state)
    {
        
        
        return [select Id,Name FROM Account Where BillingState=:state];
	}
}