<template>
<div class="eshop-container-wrapper">
  <div class="container">
    <b-container >
    <b-row >
      <b-col class="col-wrapper" v-for="item in goods" :key="item">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="item.img" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title" v-text="item.name"></h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</div>
  
</template>
<script>
export default {
    data () {
        return {
            goods: [
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' },
                { name: 'test', img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-08/17/18/campaign_images/buzzfeed-prod-fastlane02/19-poop-facts-that-will-make-you-say-shit-2-22195-1471473131-1_dblbig.jpg' }
            ]
        }
    }
}
</script>
<style>
    .eshop-container-wrapper {
        margin-top: 15px;
    }

    .col-wrapper {
        margin-top: 25px;
    }
    
</style>
