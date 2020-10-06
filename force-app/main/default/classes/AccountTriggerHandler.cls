public class AccountTriggerHandler {
    
    public static void CreateAccounts(List<Account> newAccounts)
    {
        List<Account> accountstobeinserted = new List<Account>();
        for(Account acc:newAccounts)
        {
            acc.ShippingState =acc.BillingState;
            accountstobeinserted.add(acc);
            System.debug('  shipping state '+ acc.ShippingState);
        }
        
    }

}