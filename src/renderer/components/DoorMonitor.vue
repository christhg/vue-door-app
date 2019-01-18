<template>

<div id="showNow" style="margin:0px">
    <b-alert show :variant="status?'primary':'danger'">{{notification}}</b-alert>
    <b-card>
        <b-row >
            <b-col sm="12">                        
                        <my-card :user="userInfoIn" :doorinout="true"></my-card>      
            </b-col>      
        </b-row> 
    </b-card>
    <b-card>
        <b-row>
            <b-col sm="12">
                        <my-card :user="userInfoOut" :doorinout="false"></my-card>  
            </b-col>   
        </b-row>  
  </b-card>
</div>   
</template>
<script>
/* eslint-disable */

import { requestFullscreen,exitFullscreen } from '@/utils/fullScreen.js'
import { createGuid } from '@/utils/createGuid.js'
import MyCard from '@/components/Card'
import MyThumbnails from '@/components/Thumbnails'
import { formatDate } from '@/utils/formatDate.js'
export default {
  data(){
    return {
      src:'http://192.168.201.21:8000/hrimage/',
        userinfo:{
            company:'成翔',
            department:'資訊部',
            empno:'D00269',
            name:'李四',
            intime:'2018-07-06 13:00',
            outtime: '2018-07-06 18:00'
        },
      userInfoIn: {
            src:"../../static/image/noentry.jpg",
            company:'XXX',
            department:"XXX",            
            empno:"XXX",
            name:"XXX",
            zwei:"XXX",
            time:'0000-00-00'
      },
      userInfoOut: {
            src:"../../static/image/noentry.jpg",
            company:'XXX',
            department:"XXX",            
            empno:"XXX",
            name:"XXX",
            zwei:"XXX",
            time:'0000-00-00'
      },
      userunknown: {
            src:"../../static/image/noentry.jpg",
            company:'未知',
            empno:"未知",
            name:"未知",
            zwei:"未知",
            department:"未知",
            time:''  
      },
      host: 'mq.deer-group.com.cn',
      port: '8088',
      status: false,
      statusIcon: 'fa fa-times',
      client: null,
      clientId: '',
      cleanSession: true,
      credShow: false,
      credIcon: "fa fa-angle-double-down",
      username: '',
      password: '',
      notification: '>>>> 系統連線異常，請重新連線，或連繫系統管理員。',
      lwShow: false,
      lwIcon: "fa fa-angle-double-down",
      willTopic: '',
      willPayload: '',
      willQoS: 0,
      willRetain: false,
      pubTopic: '',
      pubQoS: 0,
      retain: false,
      payload: '',
      priTopic: 'com/door/in',
      subTopic: 'com/door/out',
      subQoS: 0,
      subAck: '',
      disabledBtn: true,
      items: []      
    }
  },
  components:{
    'my-card':MyCard,
    'my-thumbnails':MyThumbnails
  },
  computed:{
    doorIn:function(){
      return this.src + '/' + this.userInfoIn.empno + '/' + this.userInfoIn.empno + '.jpg'
    },
    doorOut:function(){
     return this.src + '/' + this.userInfoOut.empno + '/' + this.userInfoOut.empno + '.jpg'
    }
  },
  methods:{
      onFullScreen:function(id){
            const el = document.getElementById(id);
            requestFullscreen(el)
      },
      onExitFullScreen:function(id){
            const el = document.getElementById(id);
            exitFullscreen(el)
      },
      subscribe: function() {
          var options = {
              qos: this.subQoS,
              onSuccess: this.onSubSuccess,
              onFailure: this.onSubFailure
          };
          this.client.subscribe(this.priTopic, options);
          this.client.subscribe(this.subTopic, options);
      },
      connect: function() {
          this.client = new Paho.MQTT.Client(this.host, Number(this.port), this.clientId)
          var options = {
              //userName: this.username,
              //password: this.password,
              cleanSession: this.cleanSession,
              onSuccess: this.onConnect,
              onFailure: this.onFailure,
              reconnect: true    //自動重連
          }
          if (this.willTopic != '') {
              will = new Paho.MQTT.Message(this.willPayload)
              will.destinationName = this.willTopic
              will.qos = Number(this.willQoS)
              will.retained = this.willRetain
              options.willMessage = will
          }
          this.client.onConnectionLost = this.onConnectionLost;
          this.client.onMessageArrived = this.onMessageArrived;
          this.client.connect(options);
      },
      onConnect: function () {
        this.updateValues(true, "Connect OK")
        this.subscribe();
        console.log('Subscribed');
      },
      onFailure: function() {
        this.updateValues(false, "Connect Failed")
        console.log(message)
      },
      onConnectionLost: function(responseObject) {
          this.updateValues(false, "Connection Lost")
          if (responseObject.errorCode !== 0) {
              console.log("onConnectionLost:" + responseObject.errorMessage);
          }
      },
      onMessageArrived: function(message) {
          var topic = message.destinationName;
          var payload = message.payloadString;
          this.items.unshift({
              topic: topic,
              payload: payload
          })
          //
          if( topic === this.priTopic){
              if(payload == 'undefined'){
                    this.userunknown.time = formatDate(new Date(),5)
                    this.userInfoIn = this.userunknown
              }else{
                    this.userInfoIn = JSON.parse(payload)
                    this.userInfoIn.src = this.doorIn
                    this.userInfoIn.company = '成翔電子'
              }
          }
          else if (topic === this.subTopic) {
              if(payload == 'undefined'){
                    this.userunknown.time = formatDate(new Date(),5)
                    this.userInfoIn = this.userunknown
              }else{
                    this.userInfoOut = JSON.parse(payload)
                    this.userInfoOut.src = this.doorOut
                    this.userInfoOut.company = '成翔電子'
              }
          }else{
              this.userInfoOut.src = this.noentry
          }
      },
      onSubFailure: function(message) {
          this.subAck = "Fail to subscribe!"
          console.log(message)
      },
      onSubSuccess: function(message) {
          this.subAck = "Subscribe!"
          console.log(message)
      },
      updateValues: function(status, notification) {
          this.notification = notification
          this.status = status
          if (status) {
              this.statusIcon = "fa fa-check"
              this.disabledBtn = false
          } else {
              this.statusIcon = "fa fa-times"
              this.disabledBtn = true
              this.subAck = ""
          }
      }                    
  },
  mounted:function(){
   		this.clientId = createGuid();
		  this.connect();
  }
}


</script>