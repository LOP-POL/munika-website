<template>
    <link rel="stylesheet" href="~/assests/css/main.css">
    <el-container>
        <el-header>
            <el-menu mode="horizontal" :router="true">
                <el-menu-item index="/">Home</el-menu-item>
                <el-menu-item index="/team">Team</el-menu-item>
            </el-menu>
        </el-header>
        
        <el-main>
            <slot/>
        </el-main>

        <el-footer>
            <el-aside>
                <h2>Social media</h2>
            </el-aside>
            <el-aside>
                <h2>Other contacts</h2>
            </el-aside>
        </el-footer>
    </el-container>
</template>
<style>
 @import url("~/assets/css/main.css")
</style>