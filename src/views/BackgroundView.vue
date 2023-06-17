<template>
    <div class="bg-img">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .bg-img {
        height: 100%;
        width: 100%;
        position: absolute;
        background-image:url(../assets/back-img.jpg);
        background-size:100%;
        background-attachment:fixed;
        z-index: -1;
        /* 使子元素居中 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>