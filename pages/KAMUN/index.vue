<script>
import TimerCard from '~/components/TimerCard.vue';

definePageMeta({
    layout: 'kamun-bar'
})
</script>
<template>
    <el-container>
        <el-header class="kamun-header">
            <div class='underlay'>
                <div class="kamun-title">
                    <h1 class="kamun-title-text">
                        KAMUN 2025
                    </h1>
                    <p class="title-sub-text">
                        Karslruhe Model United nations
                    </p>
                </div>
            </div>

           
                <img src="/img/United_Nations_General_Assembly_Hall_(3).webp" alt="united nations geenral assembly">
           

            <div class="overlay">
                <div class="overlay-content">
                    <h2>The Black forest Summit</h2>
                </div>
            </div>
        </el-header>

        <el-main class="kamun-main">
            <section class="kamun-main-section">
                <div>
                    <h2>When</h2>
                    <el-divider></el-divider>

                    <p>
                        KAMUN is a winter conference
                        and this year it is no different,
                        it takes place from <em style="font-size: larger; font-weight: 600;">5th December to the 7th
                            December 2025</em>
                    </p>
                    <div>
                        <a target="_blank"
                            href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NHJwbmRqM2NnMW5pM3ZqZmR0Mzdsbjgxam8gb2tlbGxvcGF0cmlja2xlb25AbQ&amp;tmsrc=okellopatrickleon%40gmail.com">
                            <img border="0" src="https://calendar.google.com/calendar/images/ext/gc_button1_en.gif"
                                alt="Google Calendar">
                        </a>
                        <img src="" alt="">
                    </div>
                </div>

                <TimerCard />
            </section>
          
            <section class="kamun-main-section">
                <div>
                     <h2>Where</h2>
                     <el-divider></el-divider>

                    <p>As per usual KAMUN will be held at the Karlsruhe Institude of Technology. In the beautiful city of
                    Karlsruhe</p>
                <div><img src="" alt=""></div>
                </div>
               
            </section>
            <el-divider></el-divider>
            <section class="kamun-main-section">
                <div>
                    <h2>What to expect</h2>
                    <el-divider></el-divider>
                    <p>
                        View the pictorial from previous Kamuns or watch our video
                    </p>
                </div>
                <div>
                    <img src="" alt="">
                </div>

            </section>
        </el-main>
       
        <el-footer>

        </el-footer>
    </el-container>
</template>