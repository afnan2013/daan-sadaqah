const account = {
  accountNavBar: [
    {
      name: 'My Account',
      path: '/myaccount',
      serial: 1,
      fontColor: '#fff',
      fontSize: '1.1rem',
      position: 'left',
      subNavBar: [
        {
          name: 'Identity',
          path: 'identity',
          serial: 1,
          fontColor: '#fff',
          fontSize: '1.1rem',
          formFields: [
            {
              name: 'phone',
              type: 'text',
              isVerified: false,
            },
            {
              type: 'text',
              name: 'nid',
              isVerified: '',
            },
            {
              type: 'image',
              name: 'profile_pic',
            },
          ],
        },

        {
          name: 'Name and Address',
          path: 'nameandaddress',
          serial: 2,
          fontColor: '#fff',
          fontSize: '1.1rem',
        },

        {
          name: 'Payment Method',
          path: 'paymentmethod',
          serial: 3,
          fontColor: '#fff',
          fontSize: '1.1rem',
        },
        {
          name: 'Nominee',
          path: 'nominee',
          serial: 5,
          fontColor: '#fff',
          fontSize: '1.1rem',
        },
      ],
    },

    {
      name: 'My Posts History',
      path: 'myposts',
      serial: 2,
      fontColor: '#fff',
      fontSize: '1.1rem',
      position: 'left',
    },

    {
      name: 'Fees and Dues',
      path: 'feesanddues',
      serial: 3,
      fontColor: '#fff',
      fontSize: '1.1rem',
      position: 'left',
    },

    {
      name: 'Create Post',
      path: 'feesanddues',
      serial: 4,
      fontColor: '#fff',
      fontSize: '1.1rem',
      position: 'right',
    },
  ],
};

export default account;
