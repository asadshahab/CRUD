
const mongoodb=require('mongoose')
var Userdb=require('../model/model');
// create and save new users
exports.create=(req,res) =>{

    if(!req.body) {
        res.status(400).send({message: "content cannot be empty!"});
        return;

    }


    // new User

    const user= new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender:req.body.gender,
        status: req.body.status
    })

    // save user into database
    user
    .save(user)
    .then(data => {
        // res.send(data);
        res.redirect('/add-user')
    })
    .catch ( err =>{
        res.status(500).send({
            message: err.message || "some error ocure while creating new user"
        });
    })
}




    // for retriew and return
    exports.find=(req,res)=>{
        if(req.query.id){
            const id=req.query.id;
            Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send ({message:` data will be not found with id ${id}`});

                }else{
                    res.send(data);
                }
                
            })
            .catch( err => {
                res.status(500).send({message: `error while finding this ${id}`});
            })

        }else{

        Userdb.find()
            .then(user =>{
                res.send(user);

            })
            .catch(err => {
                res.status(400).send ({message: err.message||"Error Ocure while retriewing user informations"})
            })
        }
        

    }
    // update and new identified user by user
    exports.update= (req,res) => {
        if(!req.body){
            return res
            .status(400).send({message:"Data to update cannot be Empty"})
        }
        const id=req.params.id;
        Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message:`can not updated data wiith ${id} May be User not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.send(500).send({message:`Error while Updating`})
        })

        
    }
// delete the user by specified user id
exports.delete= (req,res) =>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send ({message:`Data will not be delete by ${id}`})
        }else{
            res.send({message:`user delelted successfully by ${id}`})
        }

    })
    .catch(err =>{
        res.status(500).send({message: `user not deleted with id ${id}`});
    });

}