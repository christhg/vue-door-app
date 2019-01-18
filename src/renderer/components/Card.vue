<template>
<div>
    <b-row>
        <b-col sm="5">
            <b-row>
                    <b-col sm="6">
                            <!--<b-img :src="user.src" fluid-grow alt="Responsive Image" />-->
                            <b-img thumbnail width="300" height="265" :src="user.src" alt="Responsive Image" />                                                                                                                                                                     
                    </b-col>

                    <b-col sm="6">
                    <b-card title="Card Title"
                            <b-list-group style="font-size:14px;">
                                    <b-list-group-item :variant=" doorinout?'success':'primary'">{{ doortext }}</b-list-group-item>
                                    <b-list-group-item :active="user.company?true:false">廠別：{{user.company}}</b-list-group-item>
                                    <b-list-group-item>部門：{{user.department}}</b-list-group-item>
                                    <b-list-group-item>工號：{{user.empno}}</b-list-group-item>
                                    <b-list-group-item>姓名：{{user.name}}</b-list-group-item> 
                                    <b-list-group-item>職稱: {{user.zwei}}</b-list-group-item>                                            
                                    <b-list-group-item variant="danger">時間：{{user.time}}</b-list-group-item>
                             </b-list-group>
                    </b-card>
                    </b-col> 
            </b-row>          
        </b-col>
        <b-col sm="7">
            <my-thumbnails :rows="rows"></my-thumbnails>
        </b-col>      
    </b-row>      
</div>                        
</template>
<script>
import MyThumbnails from '@/components/Thumbnails'
/* eslint-disable */
export default {
    props:['user','doorinout'],
    data(){
        return {
            userinfo:{
                src:'http://192.168.201.21:8000/hrimage/D01158/D01158.jpg',
                company:'成翔',
                department:'資訊部',
                empno:'D00001',                
                name:'張三',
                time:'2018-07-06 13:00'
            },
            items:[
                {
                    src:'static/image/noentry.jpg',
                    company:'XXX',
                    department:"XXX",
                    empno:"XXX",
                    name:"XXX",
                    time:'0000-00-00'
                },
                {
                    src:'static/image/noentry.jpg',
                    company:'XXX',
                    department:"XXX",
                    empno:"XXX",
                    name:"XXX",
                    time:'0000-00-00'
                },
                {
                    src:'static/image/noentry.jpg',
                    company:'XXX',
                    department:"XXX",
                    empno:"XXX",
                    name:"XXX",
                    time:'0000-00-00'
                },
                {
                    src:'static/image/noentry.jpg',
                    company:'XXX',
                    department:"XXX",
                    empno:"XXX",
                    name:"XXX",
                    time:'0000-00-00'
                }                                                
            ]
        }
    },
    components:{
        'my-thumbnails':MyThumbnails
    },    
    mounted:function(){
        // this.userinfo = this.user
    },
    computed:{
        rows: function(){
            if(this.items.length == 5){
                this.items.pop()
            }
            this.items.unshift(this.user)
            return this.items
        },
        doortext: function(){
            if(this.doorinout){
                return "門禁進入"
            }
            return "門禁外出"
        }
    }
}
</script>