import { LightningElement,wire,track } from 'lwc';
export default class BoatSearch extends LightningElement {

    isLoading = false;
    @track boatList;
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
        if(event.detail != null){
        console.log('wewe'+event.detail.boatTypeId);
       let boatType=event.detail.boatTypeId;
       this.template.querySelector('c-boat-search-results').searchBoats(boatType);
        }
    }
    
    createNewBoat() { }

}