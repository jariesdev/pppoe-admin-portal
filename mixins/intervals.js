export default {
    data(){
        return {
            intervalIds: []
        }
    },
    methods: {
        setInterval(func, interval){
            const intervalId = setInterval(func, interval)
            this.intervalIds.push(intervalId)
            return intervalId
        },
        clearInterval(id){
            clearInterval(id)
        }
    },
    destroyed() {
        for(let i = 0; i < this.intervalIds.length; i++){
            this.clearInterval(this.intervalIds[i])
        }
    }
}
