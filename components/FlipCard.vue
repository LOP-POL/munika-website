<script lang=ts setup>
const props = defineProps<{
    chairs:[]
}>()
const chairsList = computed(()=>{
    if(props.chairs){
        return props.chairs
    }
    else{
        []
    }
})
</script>
<template>
    <section class="flip-cards">
        <details>
        <summary>
            <img src="/img/Leon.jpg" alt="chair picture">
            <div class="names">
                <p>Leon Patrick</p>
                <p class="spacer">°</p>
                <p>Okello</p>
            </div>
        </summary>
             <el-button style="rotate:y 180deg; position: absolute; z-index:5; bottom:10px; left:10px"type="warning" v-on:click="console.log('hello')">more</el-button>        
            <div class="back">
                <ElText size="large" line-clamp="10" style="font-size: 4vmin;">
                    Leo architects scalable backend systems and has a soft spot for developer tooling. Previously at two YC startups, he now obsesses over performance and clean APIs.
                </ElText>
                              
            </div>
       
    </details>
    </section>
    
</template>
<style scoped>
    * {
	box-sizing: border-box;
	margin: 0;
}
:root {
	--duration: 1s;
	--ease: cubic-bezier(0.34, 1.56, 0.64, 1);
}
.flip-cards{
    padding: 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	perspective: 1200px;
    color:white;
}
@media (width < 1024px) {
        .flip-cards{
		grid-template-columns: repeat(2, 1fr);
        }
	}
	@media (width < 500px) {
        .flip-cards{
		grid-template-columns: repeat(1, 1fr);
        }
	}

details {
	pointer-events: none;
	position: relative;
	justify-self: center;
	transform-style: preserve-3d;
	width: 100%;
    max-width:50vw;
    max-height: 80vh;
   
}
@media (prefers-reduced-motion: no-preference) {
	details:hover {
		rotate:y -10deg;
		
	}
    /* details img {
			translate: -5% -5%;
		} */
    details{
		transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), rotate 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

    }
		
	}

details[open] {
    transform: rotateY(180deg);
}

summary,
.back {
	aspect-ratio: 3/4;
	border: 2px dashed #111;
	border-radius: 1rem;
	padding: 5%;
	width: 100%;
	backface-visibility: visible;
	background-color: white;
     max-height: 80vh;
   
}
 .back div{
    max-height:100%;
   
 }
summary {
    
	overflow: clip;
	position: relative;
	pointer-events: all;
	cursor: pointer;
	list-style: none;
	transform: translateZ(2px);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.4fr ;
    grid-template-areas:
     "picture"
     "names"
     ;
    align-items: center;
    place-content: center;
    place-items: center;
    justify-content: center;
   
    text-align: center;
   
}
summary	img {
        grid-area: picture;
		width:80%;
        height:80%;
        object-fit: cover;
        border-radius: 50%;
		transition: translate 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        border:2px solid white;
        transition:0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0px 0px 10px black;
	}
summary img:hover{
    
    box-shadow: 
            0px 0px 0px 4px var(--special-green) ,
            0px 0px 0px 8px var(--special-yellow) ,
            0px 0px 0px 12px var(--special-red) ;
	}

summary .names{
    grid-area: names;
    color:white;
    width: 100%;
    height: 100%;
   
    box-shadow: 0px 0px 20px 50px var(--seasalt);
    background-color: var(--seasalt);
}
summary::after{
    content: "";
    background-image: radial-gradient(var(--theme-color) 8%, transparent 8%);
    background-position: 0% 0%;
    background-size: 8vmin 8vmin;
    position: absolute;
    /* background-color: #e2fc91; */
    /* opacity: 0.3; */
    bottom:2px;
    left:2px;
    z-index: -1;
    /* border:5px solid black; */
    width:100%;
    height:100%;
    border-radius: inherit;
    border-bottom-right-radius: 50%;
    margin: 0;
    padding: 0;
}
summary .names p:hover{
    font-size:1.2em;
}
summary .names p{
     font-size:0.9em;
}
summary .names .spacer{
    color:var(--theme-color)
}

summary::-webkit-details-marker {
    display: none;
}

summary::details-content {
	@media (prefers-reduced-motion: no-preference) {
		transition: content-visibility 1s ease-out allow-discrete;
	}
}

.back {
    overflow-y:hidden;
    overflow-x: hidden;
	pointer-events: none;
	position: absolute;
	top: 0;
	transform: rotateY(180deg) translateZ(-1px);
  
    justify-content: center;
    padding:10px;
   
}
back > div{
    width:100%;
    max-width: 100%;
}
/* .back + p {
		margin-top: 0.5em;
	} */

	/* ul {
		margin-top: 0.5em;
		list-style-type: "";
		padding: 0;
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		
	}
li {
			padding: 0.25em;
			border-radius: 0.25rem;
			
			font-size: 0.7rem;
			background: #111;
			color: #e2fc91;
		} */
</style>