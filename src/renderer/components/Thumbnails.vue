<template>
<b-container fluid class="p-1 bg-dark">
  <b-row>  
    <b-col v-if="index>0" v-for="(item,index) in rows" :key="index" sm="3" style="font-size:10px">
      <b-img thumbnail fluid :src="item.src" alt="Thumbnail" /></br>
      <span class="text-success">公司:{{item.company}}</span></br>
      <span class="text-success">部門:{{item.department}}</span></br>
      <span class="text-info">工號:{{item.empno}}</span></br>
      <span class="text-info">姓名:{{item.name}}</span></br>
      <span class="text-info">職稱:{{item.zwei}}</span></br>
      <span class="text-danger">{{item.time}}</span>    
    </b-col>    
  </b-row>
</b-container>
</template>
<script>
    export default {
        props:['rows'],
        data(){
            return{
                items:[
                    {
                        src:'http://192.168.201.21:8000/hrimage/D01158/D01158.jpg',
                        company:'成翔電子',
                        department:'資訊部',
                        empno:'D00001',
                        name:'張三',
                        time:'2018-07-06 10:30'
                    },
                    {
                        src:'http://192.168.201.21:8000/hrimage/D01158/D01158.jpg',
                        company:'成翔電子',
                        department:'資訊部',
                        empno:'D00001',
                        name:'張三',
                        time:'2018-07-06 10:30'
                    },
                    {
                        src:'http://192.168.201.21:8000/hrimage/D01158/D01158.jpg',
                        company:'成翔電子',
                        department:'資訊部',
                        empno:'D00001',
                        name:'張三',
                        time:'2018-07-06 10:30'
                    }                                                          
                ]
            }
        }
    }
</script>