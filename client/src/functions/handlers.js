import axios from "axios";

export const getAllCustomersFromDatabase = async (dispatch, getCustomers) => {
    // const response = await axios.get('http://localhost:3000/')
    await axios.get('http://localhost:3000/').
    then((response) => {
        const {data} = response;
        dispatch(getCustomers(data)) ////DISPATCH TO STORE
    })
}

export const navigateTo = (e, navigate) => {
    const link = e.target.getAttribute('link')
    console.log('FROM NAVIGATE TO')
    navigate(`/${link}`)
}

export const deletCustomer = async (e, input, setInput) => {
    const deleteByID = {
        idNumber: input.idNumber,
    }
    await axios.delete(`http://localhost:3000/deletecustomer/${input.idNumber}`).
    then(() => setInput({
        idNumber: ''
    }))
}

export const addCustomer = async (
    e, 
    input, 
    setInput,
    dispatch,
    getNewCustomer) => {
    if(input.username === '' || input.password === ''){
        document.getElementById('register').style.border = "2px solid red";
        return;
    }     
    const newCustomer = {
        name: input.name,
        gender: input.gender,
        phone: input.phone,
        address: input.address,
        username: input.username,
        password: input.password,
    }
    await axios.post(`http://localhost:3000/addcustomer`, newCustomer).
    then((response) => axios.get(`http://localhost:3000/findcustomer/${response.data.insertId}`)).
    then((response) => dispatch(getNewCustomer({
        _id: response.data[0]._id,
        name: response.data[0].name,
        gender: response.data[0].gender,
        address: response.data[0].address,
        phone: response.data[0].phone,
        // policies: [],
        // paymentmethods: [],
    }))).
    then(() => setInput({
        idNumber:'',
        name: '',
        gender: '',
        address: '',
        phone: '',
        username: '',
        password: '',
        company: '',
        nameOnCard: '',
        typeOf: '',
        cardNumber: '',
        expiration: '',
    }))
}

export const updatePersonalInfo = async (
    e, 
    input, 
    setInput,
    dispatch,
    getUpDatedInfo) =>{
    const update = {
        name: input.name,
        gender: input.gender,
        company: input.company,
    }
        await axios.put(`http://localhost:3000/editcustomer/${input.idNumber}`, update).
        then(() => dispatch(getUpDatedInfo({
            name: input.name,
            gender: input.gender,
            company: input.company,
        }))).
        then(() => setInput({
            idNumber: '',
            name: '',
            gender: '',
            address: '',
            phone: '',
            company: '',
            username: '',
            password: '',
        }))
}

export const addCardInfo = async (
    e, 
    input, 
    setInput,
    customer) =>{  
    const newCard = {
        customer_id: customer._id,
        name: input.nameOnCard,
        typeOf: input.typeOf,
        number: input.cardNumber,
        expiration: input.expiration,
    }
    console.log(newCard)
        await axios.post(`http://localhost:3000/addcard/${customer._id}`, newCard).
        then(response => setInput({
            nameOnCard: '',
            typeOf: '',
            number: '',
            expiration: '',
        }))
        // navigateTo(e, navigate);
}

export const findCustomerbyID = async (
    input, 
    setInput, 
    dispatch,
    getCustomerByID
    ) => {

    await axios.get(`http://localhost:3000/findcustomer/${input.idNumber}`).
    then((response) => {
        dispatch(getCustomerByID({
            _id: response.data._id,
            name: response.data.name,
            gender: response.data.gender,
            company: response.data.company,
            policies: response.data.policies,
        }))}).
    then(() => setInput({
        idNumber: '',
        name: '',
        gender: '',
        company: '',
    }))    
}


//.............................................
export const handleChange = (e, setInput) => {
    const {name, value} = e.target;
    setInput(state => {
        return {
            ...state,
            [name]: value,
        }
    })
}

export const handleLOGIN = async (
    e,
    input,
    setInput,
    dispatch,
    navigate,
    loginStatus,
    getLoginDetails) => {
    e.preventDefault();
    if(input.username === '' || input.password === ''){
        document.getElementById('login').style.border = "2px solid red";
        return;
    } 
    // const login = {
    //     username: input.username,
    //     password: input.password,
    // }
    // const response = await axios.post('http://localhost:3000/login', login);
    const response = await axios.post('http://localhost:3000/login', {
        username: input.username,
        password: input.password,
    });
    let {data} = response;
    data = data[0];
    console.log(data)
    if(data == 'undefined' || data == 'null'){
        document.getElementById('login').style.border = '2px solid Red';
        return;
    } 
    dispatch(getLoginDetails({
        _id: data._id,
        name: data.name,
        gender: data.gender,
        address: data.address,
        phone: data.phone,
        company: data.company,
        policies: data.policies,
        paymentmethods: data.paymentmethods,
    }));
    dispatch(loginStatus(true))
    setInput({
        idNumber:'',
        name: '',
        gender: '',
        address: '',
        phone: '',
        username: '',
        password: '',
        company: '',
        nameOnCard: '',
        typeOf: '',
        cardNumber: '',
        expiration: '',
        });
    navigateTo(e, navigate);
}

export const fetchInventory = async (
    dispatch,
    inventory,
    addInventory
    ) => {
    const response = await axios.get('http://localhost:3000/inventory');
    const {data} = response;
    dispatch(addInventory(data));
    console.log('GET INVENTORY CLICKED');
    console.log(data);
}

export const addRemoveButtons = (
    e,
    cart,
    dispatch,
    addToCart,
    inventory,
    removeFromCart) => {
        inventory.products.forEach(product => {
            if(product.id == e.target.getAttribute('link')){
                if(e.target.getAttribute('tag') === 'add'){
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                    dispatch(addToCart({
                        id: product.id,
                        policy: product.policy,
                        price: product.price,
                        payment: 0,
                        balance: 0,
                        checked: false,
                        payInFull: false,
                        partial: false,
                    }))
                }
                if(e.target.getAttribute('tag') === 'remove'){
                    const remove = cart.products.filter(product => product.id != e.target.getAttribute('link'))
                    dispatch(removeFromCart(remove))
                    e.target.previousSibling.style.display = 'block';
                    e.target.style.display = 'none';
                    
                }
            }
        })
}

export const goToPaymentOptions = (
    e,
    navigate,
    dispatch,
    paymentOptionsStatus) => {
        dispatch(paymentOptionsStatus(true))
        navigateTo(e, navigate);

}

export const partialPaymentCheckBox = (
    e, 
    cart,
    checked, 
    dispatch)=> {
    const link = e.target.getAttribute('link');
    const element = e.target.nextSibling;
    const parent = e.target.parentNode;
    cart.products.forEach((product => {
        if(product.id == link){
        switch(e.target.checked){
            case true:
                element.style.display = 'none';
                element.nextSibling.style.display = 'flex';
                parent.lastChild.style.display = 'flex';
                parent.previousSibling.style.display = 'none';
                dispatch(checked({
                    ...product,
                    checked: true,
                    partial: true,
                }))
                break;
            case false:
                element.style.display = 'flex';
                element.nextSibling.style.display = 'none';
                parent.lastChild.style.display = 'none';
                parent.previousSibling.style.display = 'flex';
                dispatch(checked({
                    ...product,
                    checked: false,
                    partial: false,
                }))
                break;
                }
            }
        }
    ))
}

export const fullPaymentCheckBox = (
    e,
    cart,
    checked, 
    dispatch)=> {
    const link = e.target.getAttribute('link');
    const parent = e.target.parentNode;
    cart.products.forEach(product => {
        if(product.id == link){
        switch(e.target.checked){
            case true:
                parent.nextSibling.style.display = 'none';
                dispatch(checked({
                    ...product,
                    checked: true,
                    payInFull: true,
                    payment: product.price,
                }))
                break;
            case false:
                parent.nextSibling.style.display = 'flex';
                dispatch(checked({
                    ...product,
                    checked: false,
                    payInFull: false,
                    payment: 0,
                }))
                break;
            }
        }
    })
}

export const submitPartialPayment = (
    e,
    cart,
    input,
    setInput,
    dispatch,
    addPartial,
    ) => {
        const link = e.target.getAttribute('link');
        const parent = e.target.parentNode;
        e.preventDefault();
        cart.products.forEach(product => {
            if(input.amount > product.price) return;
            if(product.id == link){
                dispatch(addPartial({
                             ...product,
                    payment: parseInt(input.amount),
                    balance: product.price - parseInt(input.amount)
                }))
                parent.children[parent.children.length - 1].style.display = 'none';
                parent.children[parent.children.length - 2].style.display = 'none';
                parent.children[parent.children.length - 4].style.display = 'none';
                parent.nextSibling.style.display = 'flex';
            }
        })
        setInput({
            idNumber:'',
            name: '',
            gender: '',
            address: '',
            phone: '',
            username: '',
            password: '',
            company: '',
            nameOnCard: '',
            typeOf: '',
            cardNumber: '',
            expiration: '',
            amount: '',
        });
        // parent.children[parent.children.length - 1].style.display = 'none';
        // parent.children[parent.children.length - 2].style.display = 'none';
        // parent.children[parent.children.length - 4].style.display = 'none';
        // parent.nextSibling.style.display = 'flex';
}

export const resetPartialPayment = (
    e,
    cart,
    input,
    setInput,
    dispatch,
    resetPartial,
    ) => {
        const link = e.target.getAttribute('link');
        const parent = e.target.parentNode;
        const previous = e.target.previousSibling;
        parent.parentNode.parentNode.style.border = 'none';

        e.preventDefault();
        cart.products.forEach(product => {
            if(product.id == link){
                dispatch(resetPartial({
                    id: product.id,
                    policy: product.policy,
                    price: product.price,
                    payment: 0,
                    balance: 0,
                    checked: false,
                    payInFull: false,
                    partial: false,
                }))
                parent.firstChild.style.display = 'flex';
                e.target.style.display = 'none';            // Hide RESET button
                previous.firstChild.checked = false;
                previous.firstChild.style.display = 'flex';
                previous.children[1].style.display = 'flex';
                console.log(parent.parentNode.parentNode)
            }
        })
        setInput({
            idNumber:'',
            name: '',
            gender: '',
            address: '',
            phone: '',
            username: '',
            password: '',
            company: '',
            nameOnCard: '',
            typeOf: '',
            cardNumber: '',
            expiration: '',
            amount: '',
        });
        // parent.firstChild.style.display = 'flex';
        // e.target.style.display = 'none';            // Hide RESET button
        // previous.firstChild.checked = false;
        // previous.firstChild.style.display = 'flex';
        // previous.children[1].style.display = 'flex';
        // console.log(parent.parentNode.parentNode)
}

export const goToReviewOrder = (
    e,
    cart,
    navigate) => {
    cart.products.forEach(product => {
        const element = document.querySelector(`[id="product-cart"][link="${product.id}"]`);
        if(product.partial === false && product.payInFull === false){
            element.style.border = '2px solid red';
            return;
        }
        if(product.partial === true || product.payInFull === true) element.style.border = '1px solid blue';
        })
    navigateTo(e, navigate);
}

export const confirmOrder = async (
    e,
    cart,
    dispatch,
    customer,
    navigate,
    clearCart,
    addPolicies) => {
    navigateTo(e, navigate);

}

export const showPurchase = async (
    e,
    cart,
    input,
    setInput,
    dispatch,
    customer,
    navigate,
    clearCart,
    addPolicies) => {
    if(input.nameOnCard == '' || input.typeOf == '' || 
        input.cardNumber == '' || input.expiration == ''){
        document.getElementById('addcard').style.border = "2px solid red";
        console.log(input.nameOnCard == '')
        return;
    }
    dispatch(addPolicies(cart.products)); //dispatch from cart to customer
    cart.products.forEach( async (policy) => {
       const newPolicy = {
            customer_id: customer._id,
            id: policy.id,
            policy: policy.policy,
            price: policy.price,
            payment: policy.payment,
            balance: policy.balance,
        }
        await axios.put(`http://localhost:3000/addpolicy`, newPolicy); //and add them to the database
    })
    addCardInfo(e, input, setInput, customer);
    dispatch(clearCart())
    navigateTo(e, navigate);
}

export const fetchPolicies = async (setData, customer) => {
    await axios.get(`http://localhost:3000/policies/${customer._id}`).
    then((response) => setData(response.data))
}




