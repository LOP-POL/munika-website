<style scoped>

.custom-nav-menu{
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color: white;
   
    font-weight: lighter;
    color:black;
     margin:0;
    height: 100%;
    width: 100%;
    margin-right:10px;
    border-radius: 20px;
    text-align: center;
    padding-left:5px;
    padding-right: 5px;
}
ul li{
    margin: 5px;
}


a{
    color: black;
   text-decoration: none;
   margin:5px;
   
}

a:hover , .router-link-exact-active{
    border-bottom: 2px solid ;
    color: var(--theme-color); 
}
ul .special-nav-link{
    background-color: var(--theme-color);
    border-radius: inherit;
    padding:5px;

}

ul .special-nav-link a:hover{
    color: white;
}


</style>
<template>

        <ul type="none" class="custom-nav-menu">
            <li v-for="route in props.routes" :class="(route.page=='MUNIKA' || route.page=='KAMUN')?'special-nav-link':'normal-nav-link'">
                <NuxtLink :to="route.path">{{ route.page }}</NuxtLink>
            </li>
        </ul>
   
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps([
    'routes'
])
const router = useRoute()
</script>