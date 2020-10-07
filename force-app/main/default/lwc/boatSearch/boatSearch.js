import { LightningElement,wire,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class BoatSearch extends NavigationMixin(LightningElement) {

    isLoading = false;
    @track boatList;
    // Handles loading event
    handleLoading(event) { 
        console.log('sdsd parent');
        this.isLoading=true;
      //  this.template.querySelector('c-boat-search-results').refresh();

        
    }
    
    // Handles done loading event
    handleDoneLoading() {

        this.isLoading=false;
     }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
        if(event.detail != null){
        console.log('wewe'+event.detail.boatTypeId);
       let boatType=event.detail.boatTypeId;
       //console.log(this.template.querySelector('c-boat-search-results'));
       this.template.querySelector('c-boat-search-results').searchBoats(boatType);
        }
    }
    
    createNewBoat() { 

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });

    }

}