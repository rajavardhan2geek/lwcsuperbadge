@isTest
public class AccountTriggerTest {

    public static testmethod void createTestAccounts()
    {
        List<Account> accountlist=new List<Account>();
        for(Integer i=0;i<200;i++){
            Account acc = new Account(Name='Test '+i,BillingState='CA');
                accountlist.add(acc);
        }
        insert accountlist;
       // System.assertEquals(accountlist.get(0).BillingState,accountlist.get(0).ShippingState);
    }
}