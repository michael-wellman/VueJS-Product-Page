app.component('product-details', {
    props:{
        descriptions: {
            type: Array,
            required: true
        }
    },
    template: 
    /*html*/
    `<ul>
        <li v-for="detail in descriptions">{{ detail }}</li>
    </ul>`
})