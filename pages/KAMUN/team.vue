<script lang="ts" setup>
    import type { ImageProps } from 'element-plus'

    const vorstandPictures:string[] = [
        "Leon",
        "Varshi",
        "anuAndVarshi",

    ]

    const fits = [
    'fill',
    'contain',
    'cover',
    'none',
    'scale-down',
    ] as ImageProps['fit'][]
</script>
<template>
    <h1>
        vorstand
    </h1>

    <p>
        Introductory statement on vorstand and other content
    </p>

    <el-divider/>

    <el-container>
        
        <el-main style="background-color:black;" class="carousel-container">
            <el-carousel height="500px" type="card" :autoplay="false" motion-blur arrow="hover">
                <el-carousel-item v-for="item in vorstandPictures " :key="item" style="border:solid 2px black;" >
                    <el-card shadow="hover" class="people-card">
                        <template #header>
                            <span> {{ item }} </span>
                        </template>
                       
                             <img class="card-img" :src="`img/${item}.jpg`" alt="Leon" />
                       
                        <template #footer>
                            <p>
                                Hello world you need to see this Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nulla tenetur enim eligendi? Quam, eius deserunt fugiat in, nisi velit incidunt magni est nesciunt, molestiae laborum ipsa quos rem quisquam.
                            </p>
                        </template>
                    </el-card>
                </el-carousel-item>
            </el-carousel>
        </el-main>
    </el-container>
</template>
<style></style>
