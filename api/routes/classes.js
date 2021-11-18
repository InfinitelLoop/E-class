var express = require('express');
var router = express.Router();
var axios = require('../axiosFile');

function codeGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
}


router.post('/create', function (req, res, next) {
    /**
     * obj = {
       classname: className,
       section: section.value,
       subject: subject.value,
       room_no: roomNo.value,
       username: username
     }
     */
    let code = 'CL-' + codeGenerator();
    let obj = {
        classname: req.body.classname,
        section: req.body.section,
        subject: req.body.subject,
        room_no: req.body.room_no,
        classCode: code
    }

    // create class
    axios.post('/classes.json', obj)
        .then(dbRes => {

            let classKey = dbRes.data.name;

            //fetch user list to get user key to update myClasses
            axios.get('/users.json')
                .then(usersListRes => {
                    let userObj = {};
                    let userKey = 0;

                    for (let key in usersListRes.data) {
                        let data = usersListRes.data[key];
                        if (req.body.username.trim() === data.username) {
                            userObj = data;
                            userKey = key;
                            break;
                        }
                    }

                    let myClassList = userObj.myClasses || [];
                    myClassList.push(classKey);

                    // add res.data key in user object as my classes and enrolled classes
                    axios.put(`/users/${userKey}/myClasses.json`, myClassList)
                        .then(dbRes2 => {
                            res.send({
                                status: "SUCCESS",
                                classCode: code
                            })
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})



// join Class
router.post('/join', function (req, res, next) {

    axios.get('/classes.json')
        .then(dbRes => {

            // Fetching class list from firebase

            let classKey = 0;
            let classList = dbRes.data;

            // checking class object with passed class code from frontend
            for (let key in classList) {
                if (req.body.classCode.trim() === classList[key].classCode) {
                    classKey = key;
                    break;
                }
            }

            //checking for class code validity
            if (classKey === 0) {
                res.send({
                    status: 'Invalid class code'
                })
            } else {

                //class key has been extracted for applied class code
                //fetch user list to get user key of signed in user and to push class key into its enrolledClasses
                axios.get('/users.json')
                    .then(usersListRes => {
                        let userObj = {};
                        let userKey = 0;

                        // fetching user key of signed in user
                        for (let key in usersListRes.data) {
                            let data = usersListRes.data[key];
                            if (req.body.username.trim() === data.username) {
                                userObj = data;
                                userKey = key;
                                break;
                            }
                        }

                        let enrolledClassList = userObj.enrolledClasses || [];
                        let myClassList = userObj.myClasses || [];

                        //check if already enrolled for this class
                        if (enrolledClassList.indexOf(classKey) === -1) {
                            if(myClassList.indexOf(classKey)===-1){
                                enrolledClassList.push(classKey);
                                // add class key in user object's enrolled classes
                                axios.put(`/users/${userKey}/enrolledClasses.json`, enrolledClassList)
                                    .then(dbRes2 => {
                                        res.send({
                                            status: "SUCCESS",
    
                                        })
                                    })
                                    .catch(err => console.log(err))
                            } else {
                                res.send({
                                    status: 'You cannot join a Class created by you'
                                })
                            }
                        } else {
                            res.send({
                                status: 'Already enrolled to this Class'
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

// ClassCards

router.post('/', function (req, res, next) {

    axios.get('/users.json')
    .then(usersListRes => {
        let userObj ={};
        let userKey = 0;

        // fetching user key of signed in user
        for(let key in usersListRes.data) {
            if(req.body.username.trim() === usersListRes.data[key].username) {
                userObj = usersListRes.data[key];
                userKey = key;
                break;
            }
        }

        let enrolledClassList = userObj.enrolledClasses || [];
        let myClassList = userObj.myClasses || [];

        axios.get('/classes.json')
        .then(classListRes => {
            let enrolledClassesData = enrolledClassList.map(classKey => classListRes.data[classKey])
            let myClassesData = myClassList.map(classKey => classListRes.data[classKey])

            res.send({
                status: "SUCCESS",
                enrolledClassesData: enrolledClassesData,
                myClassesData:  myClassesData
            })
        })
        .catch(err => res.send({
            status: "ERROR"
        }))
    })
    .catch(err => res.send({
        status: "ERROR"
    }))
})

module.exports = router;