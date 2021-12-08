const auth = require('../middleware/auth');
const { schedulePointAddress } = require('../models/tour/schedulePointAddress');
const  {Service}  = require('../models/tour/service');
const { Tour } = require('../models/tour/tour')

const router = require('express').Router()

//find tour with id
router.get('/:id',async function(req,res,next) {
    const process =  Tour.findOne({_id:id})  
    tour = await process;
    if(!tour) return res.status(404).send("invalid id tour")
    return res.send(tour)
})

//admin post a new tour
router.post('/',[auth],async function(req,res,next){
    const name = req.body.name
    if(await Tour.findOne({name:name}))
        return res.status(400).send("tour nay da ton tai") 
    const cost = req.body.cost
    const describeTour = req.body.describeTour
    const schedulePoints = req.body.schedule
    if(!schedulePoints) return res.status(400).send('invalid data')
    let process = schedulePoints.map(async (point,index)=>{
        let pointAddress = await schedulePointAddress.findOne({name:point.name})
        if(!Object.keys(pointAddress).length) {
            let newPointAddress = new schedulePointAddress({name:point.name})
            const {err} = schedulePointAddress.validate(newPointAddress)
            if(err) throw err
            newPointAddress.save()
            .then(result => point._id =result._id)
        } else {
            point.idSchedulePointAddressRef= pointAddress._id
        }
        delete point.name
        const process = point.services.map(async service=>{
            let servicedb = await Service.findOne({name:service.name})
            if(!servicedb) {
                let newService = new Service({name:service.name})
                const {err} =Service.validate(newService)
                if(err) throw err
                newService.save()
                .then(result=>{_id:result._id})
            } else return {_id:servicedb._id}
        })
        point.idServiceRefs = await Promise.all(process)
        console.log(point)
        point.estimateTimeOfArrival = new Date(point.estimateTimeOfArrival.split('/').join('-'))
        return point
    })
    const schedule = await Promise.all(process)
    const newTour = new Tour({name,schedule,describeTour,cost})
    const {err} = Tour.validate(newTour)
    if(err) throw err
    else {
        newTour.save()
            .then(result=>console.log(result))
    }
})
//find tours include  nameSchedulePoint
router.get('/has/:nameSchedulePoint',async function (req,res,next){
    const schedulePointId = await schedulePointAddress.find({name:req.params.nameSchedulePoint})
    let result = await Tour.find({ 'schedule.idSchedulePointAddressRef':schedulePointId}) 
                    .populate('schedule.idSchedulePointAddressRef')
                    .populate('schedule.idServiceRefs')
    if(!result) return res.send(404)
    const tours = result.map(tour=>{
        const result = tour.schedule.map(point=> {
            schedulePoint =point.idSchedulePointAddressRef.name
            services = point.idServiceRefs.map(service=> service.name)
            return{
                schedulePoint : schedulePoint,
                services:services,
                index: point.index
            }
        })
        return {id:tour._id,name :tour.name,schedule:result}
    })
    return res.send(tours)     
})
//change tour with id tour
router.put('/:id',[auth],async function(req,res,next) {

})
//delete tour with id tour
router.delete('/:id',[auth],async function(req,res,next){

})
module.exports = router