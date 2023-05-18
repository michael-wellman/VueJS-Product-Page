app.component('product-display', {
    props: {
        member: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img v-bind:src="image" :class="{'out-of-stock-img': !inStock}">
          </div>
          
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{sale}}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>

            <product-details :descriptions="details"></product-details>

            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)" 
              class="color-circle"
              :style="{backgroundColor: variant.color}"
            ></div>
            <button class="button" @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
            <button class="button" @click="removeFromCart">Remove Item</button>
          </div>
        </div>
        <review-list :reviews="reviews" v-if="reviews.length"></review-list>
        <review-form @review-submitted="addReview" />
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 10 },
            ],
            reviews: [],
            sizes: ['xtra-small', 'small', 'medium', 'large', 'extra-large'],
            onSale: false,
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' is on Sale!'
            }
            else { 
                ''
            }
        },
        shipping() {
            if(this.member) {
                return 'Free'
            } else {
                return '2.99'
            }
        }
    },
    methods: {
        addToCart() {
            //this.cart += 1;
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    }
})