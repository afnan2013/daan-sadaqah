const payments = {
    mfsDetails: {
        mfs_label:"MFS Accounts",
        mfs_number: "01779007937",
        mfs_companies: [
            {
                serial:1,
                mfs_name: "BKash",
                mfs_icon: "",
                mfs_link: "",
                isValidated: true
            },
            {
                serial:2,
                mfs_name: "Nagad",
                mfs_icon: "",
                mfs_link: "",
                isValidated: false
            },
            {
                serial:3,
                mfs_name: "Rocket",
                mfs_icon: "",
                mfs_link: "",
                isValidated: true
            }, 
            {
                serial:4,
                mfs_name: "Tap",
                mfs_icon: "",
                mfs_link: "",
                isValidated: false
            },       
            {
                serial:5,
                mfs_name: "SureCash",
                mfs_icon: "",
                mfs_link: "",
                isValidated: false
            },  
        ]
    },

    bankDetails: {
        bank_label:"Bank Account Details",
        account_number: "200021313435",
        bank_name: 'Brac Bank',
        branch: "Mohakhali Branch",
        routing_number: '20212134',
        check_leaf_image: "data:image/png;base64,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"
    }
}
export default payments;