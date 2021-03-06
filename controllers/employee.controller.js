const Employee = require('../models/employee.model');

/* Debugging */
let debugEmp = require('debug')('worker:debugEmp');

// Add employee.
function addEmp(req, res) {
    debugEmp('Adding employee');
    let employeeObj = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        gender: req.body.gender,
        university: req.body.university,
        job_title: req.body.jobTitle,
        address: {
            department: req.body.department,
            country: req.body.country,
            city: req.body.city,
            street_address: req.body.address,
        },
        contract: {
            hiring_date: req.body.hiringDate,
            terminating_date: req.body.terminatingDate,
            bank: req.body.bank,
            bank_account: req.body.bankAccount,
            salary: req.body.salary
        }

    }

    debugEmp('EmployeeObj: ', employeeObj);

    let employee = new Employee(employeeObj);

    employee.save((err, employee) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'failed to add employee' });
        }
        debugEmp('Employee was added successfully');
        return res.json({ msg: 'employee was added successfully' });
    });
}

// Update employee
function updateEmployee(req, res) {

    debugEmp('Updating employee');

    let employeeObj = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone_number: req.body.phoneNumber,
        job_title: req.body.jobTitle,
        department: req.body.department,
        university: req.body.university,
        address: {
            country: req.body.country,
            city: req.body.city,
            street_address: req.body.street,
        },
        contract: {
            hiring_date: req.body.hiringDate,
            terminating_date: req.body.terminatingDate,
            bank: req.body.bank,
            bank_account: req.body.bankAccount,
            salary: req.body.salary
        }

    };

    /*const update = {
        "$set": {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            phone_number: req.body.phoneNumber,
            job_title: req.body.jobTitle,
            department: req.body.department,
            university: req.body.university,

            address: {
                country: req.body.country,
                city: req.body.city,
                street_address: req.body.street,
            },
            contract: {
                hiring_date: req.body.hiringDate,
                terminating_date: req.body.terminatingDate,
                bank: req.body.bank,
                bank_account: req.body.bankAccount,
                salary: req.body.salary
            }

        }
    };*/

    debugEmp('employeeObj: ', employeeObj);

    Employee.updateOne({ email: employeeObj.email }, employeeObj, (err) => {
        if (err) {
            debugEmp(err);
            return res.json({ err: 'Failed to update employee' });
        }
        debugEmp('User was updated');
        return res.json({ msg: 'user was updated' });
    })

}

// Delete employee
function deleteEmployee(req, res) {
    debugEmp('Deleting user');
    Employee.findOneAndDelete({ email: req.body.email }, (err) => {
        if (err) {
            debugEmp('User was updated');
            return res.json({ err: 'failed to delete employee' });
        }
        debugEmp('User was updated');
        return res.json({ msg: 'employee was deleted' });
    });
}

// Search by id.
function searchById(req, res) {
    Employee.findOne({ empId: req.query.empId }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' })
        }
        return res.json({ emp });
    })
}
// Searching by firstName
function searchByFirstName(req, res) {
    Employee.find({ first_name: req.query.firstName }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' });
        }
        return res.json({ emp });
    });
}

// Searching by firstName
function searchByLastName(req, res) {
    Employee.find({ last_name: req.query.lastName }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' });
        }
        return res.json({ emp });
    });
}

// Search by email.
function searchByEmail(req, res) {
    debugEmp('searching by email');
    Employee.findOne({ email: req.query.email }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: "Database is currently offline." });
        }
        if (emp == null) {
            console.log('no employee found with this email');
            return res.json({ err: "No employee found with this email." });
        }
        debugEmp(emp);
        return res.json({ emp });
    });
}

/* Searching by gender */
function searchByGender(req, res) {
    debugEmp('Searching by gender');
    Employee.find({ gender: req.query.gender }, (err, emp) => {
        if (err) {
            debugEmp(err);
            return res.json({ err: 'Failed to search for employee.' });
        }

        debugEmp('Return results');
        return res.json({ emp });
    });
}


// Search by job title
function searchByJobTitle(req, res) {
    Employee.find({ job_title: req.query.jobTitle }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for empliyee.' });
        }
        return res.json({ emp });
    });
}

function searchByCountry(req, res) {
    Employee.find({ country: req.query.country }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for empliyee.' });
        }
        return res.json({ emp });
    });
}


// Search by city
function searchByCity(req, res) {
    Employee.find({ city: req.query.city }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' });
        }
        return res.json({ emp });
    });
}


// Search by department
function searchByDepartment(req, res) {
    Employee.find({ department: req.query.department }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' });
        }
        return res.json({ emp });
    });
}

// Search by university
function searchByUniversity(req, res) {
    Employee.find({ university: req.query.university }, (err, emp) => {
        if (err) {
            console.log(err);
            return res.json({ err: 'Failed to search for employee.' });
        }
        return res.json({ emp });
    });
}

module.exports = {

    addEmp,
    deleteEmployee,
    updateEmployee,

    searchById,
    searchByFirstName,
    searchByLastName,
    searchByEmail,
    searchByGender,
    searchByJobTitle,
    searchByCountry,
    searchByCity,
    searchByDepartment,
    searchByUniversity
};

