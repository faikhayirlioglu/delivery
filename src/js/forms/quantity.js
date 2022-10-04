export default () => {


    const Pricing = (count = 1) => {
        const priceValueInput = document.querySelector('[data-price]')
        const priceTotalInput = document.querySelector('[data-total]')
        const priceValue = priceValueInput.value

        let price = (priceValue * count).toFixed(2)

        document.querySelector('[data-checkout-total]').innerHTML = price
        document.querySelector('[data-total]').value = price
    }

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-quantity-button]')) {
            const quantity = event.target.closest('[data-quantity]')
            const quantityInput = quantity.querySelector('[data-quantity-input]')
            const quantityMin = quantityInput.min
            const quantityMax = quantityInput.max
            const quantityPlaceholder = quantity.querySelector('[data-quantity-placeholder]')
            const quantityDirection = event.target.closest('[data-quantity-button]').dataset.quantityButton
            let quantityValue = 0;

            if(quantityDirection === 'minus') {
                quantityValue = parseInt(quantityInput.value) - 1
                if (quantityValue < quantityMin) {
                    quantityValue = quantityMin
                }
            }
            else {
                quantityValue = parseInt(quantityInput.value) + 1
                if (quantityValue > quantityMax) {
                    quantityValue = quantityMax
                }
            }
            quantityInput.value = quantityValue
            quantityPlaceholder.innerHTML = quantityValue
            Pricing(quantityValue)
        }
    })

    const quantityArray = document.querySelectorAll('[data-quantity]')
    if (quantityArray.length > 0) {
        quantityArray.forEach(elem => {
            const quantityInput = elem.querySelector('[data-quantity-input]')
            quantityInput.addEventListener('focus', (event) => {
                elem.classList.add('quantity--focus')
            });

            quantityInput.addEventListener('blur', (event) => {
                elem.classList.remove('quantity--focus')
            });
        });
    }


    document.querySelector('[data-quantity-input]').addEventListener('change', function (){
        let val = parseInt(this.value)
        const quantity = this.closest('[data-quantity]').querySelector('[data-quantity-input]')
        const quantityPlaceholder = this.closest('[data-quantity]').querySelector('[data-quantity-placeholder]')
        const priceValue = document.querySelector('[data-price]').value
        let price = priceValue

        if (val < quantity.min) {
            val = quantity.min
        }
        else if (val > quantity.max) {
            val = quantity.max
        }

        quantity.value = val
        price = (priceValue * val).toFixed(2)

        document.querySelector('[data-checkout-total]').innerHTML = price
        document.querySelector('[data-total]').value = price
        quantityPlaceholder.innerHTML = val
    })
};
