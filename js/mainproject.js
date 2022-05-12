const main = () => {
  const darkMode = document.getElementById("dark-mode");
  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
  });



class Carousel{

  /**
  * @param  moveCallback
  * @param {number} index
  */

  /**
  * @param  {HTMLElement} element
  * @param {OPbject} options
  * @param {OPbject} [options.slidesToScroll = 1] Nombre d'éléments à faire défiler
  * @param {OPbject} [options.slidesVisible = 1] Nombre d'éléments visible dans un slide
  * @param {booolean} [options.loop = false] Doit-t-on boucler en fin de slide
  */
  
  
    
  
  constructor (element, options = {}){
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible:1,
      loop : false
    }, options)
    let children = [].slice.call(element.children)
    this.isMobile = false
    this.currentItem = 0
    this.moveCallbacks = []

    // Modification du DOM
    this.root = this.createDivWhitClass('carousel')
    this.container = this.createDivWhitClass('carousel__container')
    this.root.setAttribute('tabindex', '0')
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    this.items = children.map((child) => {
      let item = this.createDivWhitClass('carousel__item')
      item.appendChild(child)
      this.container.appendChild(item)
      return item;
    })
    this.setStyle()
    this.createNavigation()

    // Evenements
    this.moveCallbacks.forEach(cb => cb(0))
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', e => {
      if (e.key === 'ArrowRigth' || e.key === 'Rigth') {
        this.next()
      }else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        this.prev()
      }
    })
  }
  /**
  * Applique les bonnes dimensions aux éléments du carousel
  */


  setStyle (){
      let ratio = this.items.length / this.slidesVisible
      this.container.style.width = (ratio * 100) + "%"
      this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
    }

    createNavigation(){
      let nextButton = this.createDivWhitClass('caroussel__next')
      let prevButton = this.createDivWhitClass('caroussel__prev')
      this.root.appendChild(nextButton)
      this.root.appendChild(prevButton)
      nextButton.addEventListener('click', this.next.bind(this))
      prevButton.addEventListener('click', this.prev.bind(this))
      if (this.options.loop === true) {
        return ;
      }
      this.onMove(index => {
        if (index === 0) {
          prevButton.classList.add('caroussel__prev--hidden')
        } else {
          prevButton.classList.remove('caroussel__prev--hidden')
        }
        if (this.items[this.currentItem + this.slidesVisible] === undefined) {
            nextButton.classList.add('carousel__next--hidden')
        }else {
          nextButton.classList.remove('carousel__next--hidden')
        }
      })
    }

    next (){
      this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    prev(){
      this.gotoItem(this.currentItem - this.slidesToScroll)
    }

    /**
    * Déplace le slider vers l'élément ciblé
    * @param {number} index
    */

    gotoItem (index){
      if (index < 0) {
        if (this.options.loop) {
          index = this.items.length - this.slidesVisible
        }else {
          return ;
        }
      }else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible]
        === undefined && index > this.currentItem)) {
          if (this.options.loop) {
            index = 0
          }else {
            return ;
          }
      }
      let translateX = index * -100 / this.items.length
      this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
      this.currentItem = index
      this.moveCallbacks.forEach(cb => cb(index))
    }

    /**
    * @param {moveCallback} cb
    */

    onMove(cb){
      this.moveCallbacks.push(cb)
    }

    onWindowResize(){
      let mobile = window.innerWidth < 800
      if (mobile !== this.mobile) {
        this.isMobile = mobile
        this.setStyle()
        this.moveCallbacks.forEach(cb => cb(this.currentItem))
      }
    }

  /**
  * @param {string} className
  * @returns {HTMLElement}
  */

  createDivWhitClass (className) {
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div;
  }

  /**
  * @returns {number}
  */

  get slidesToScroll(){
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }

  /**
  * @returns {number}
  */

  get slidesVisible(){
    return this.isMobile ? 1 : this.options.slidesVisible;
  }
}


document.addEventListener('DOMContentLoaded', function () {

  new Carousel(document.querySelector('#carousel1'), {
    slidesVisible: 2,
    slidesToScroll: 1,
    loop: true
  })
})
};
addEventListener("load", main);