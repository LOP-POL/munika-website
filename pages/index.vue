<script setup lang="ts">
  onMounted(()=>{
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1'
            }

        })
    }, { threshold: 0.2 })

    document.querySelectorAll('.main-section').forEach(node => {
       
        observer.observe(node)
    })

  })
</script>
<template>
     <main-page-header />
      <section class="main-section">
        <head-and-c divider>
          <template #title>Who are we</template>
          <p>
            We are a passionate group of university students dedicated to fostering
            global awareness, diplomacy, and leadership through Model United Nations.
            Our community brings together individuals from diverse backgrounds to
            engage in thoughtful debate, develop public speaking skills,
            and collaborate on solutions to pressing international issues.
            Whether you are new to MUN or an experienced delegate, we welcome
            you to join us in exploring the world of international relations and
            making a positive impact.
          </p>
        </head-and-c>
      </section>
  
      <section class="main-section " id="where-to">
        <head-and-c divider :row-form="true">
          <template #title>Where to find us</template>
          <p>
           Export topics from global issues to ligthearted dilemmas in a relaxed, supportive setting. Sharpen your
            public
            speaking skills
            while sharing ideas and enjoying engaging discussions. We hope to see you on <NuxtLink to="news"> Tuesdays
                at 7 pm !
            </NuxtLink>
          </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5234.425597976381!2d8.391931375326154!3d49.00653639027116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797065b025e29af%3A0x48badd62a47ac146!2sKarlshochschule%20International%20University!5e0!3m2!1sen!2sde!4v1750776299865!5m2!1sen!2sde" 
        width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  
        </head-and-c>

      </section>
      <el-divider></el-divider>
      <section class="main-section">
        <ExpectSection/>

      </section>

</template>
<style>
  #where-to{
  background-image: url("/styleImgs/forest-silouette-white.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  }
</style>

