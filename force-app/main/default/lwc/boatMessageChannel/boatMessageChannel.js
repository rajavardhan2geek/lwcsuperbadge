import { LightningElement } from 'lwc';
import { APPLICATION_SCOPE, createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/BoatMessageChannel__c';
export default class BoatMessageChannel extends LightningElement {}