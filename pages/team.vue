<script>
    
</script>
<template>
    <h1>
        vorstand
    </h1>

    <el-divider/>

    <el-container>
        <el-main style="background-color: black;">
            
        </el-main>
        <el-aside style="background-color: grey;">
            <el-carousel height="400px" direction="vertical" type="card" :autoplay="false" motion-blur arrow="hover">
                <el-carousel-item v-for="item in 4" :key="item" style="border:solid 2px black; background-color:yellow;">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-aside>
    </el-container>
    <h1>
        Alumni
    </h1>

    <el-divider/>
    
    <el-container>
        <el-aside style="background-color: grey;">
            <el-carousel height="400px" direction="vertical" type="card" :autoplay="false" motion-blur arrow>
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-aside>
        <el-main style="background-color: black;">
            here4
        </el-main>
    </el-container>
</template>
<style></style>
