{
  /* <FormProvider methods={methods}>
                      <m.div>
                        <Stack
                          direction={{ sm: 'column', md: 'row' }}
                          sx={{
                            backgroundColor: { md: 'white', sm: 'none' },
                            p: 0.5,
                            borderRadius: 1,
                            marginTop: 12,
                            marginBottom: 2,
                            marginLeft: 'auto',
                            width: '92%',
                            position: 'relative',
                          }}
                        >
                          <RHFMapSearch
                            name='departure'
                            label='Point de départ'
                            variant='caption'
                            height={17}
                            width={17}
                          />
                          <IconButton sx={{ p: '2px', color: 'black' }}>
                            <Iconify
                              icon='heroicons:arrows-right-left-20-solid'
                              height={17}
                              width={17}
                            />
                          </IconButton>
                          <RHFMapSearch
                            name='destination'
                            label='Destination'
                            variant='caption'
                            height={17}
                            width={17}
                          />
                          <Divider
                            orientation='vertical'
                            variant='middle'
                            flexItem
                            sx={{ backgroundColor: '#B0B0B0' }}
                          />
                          <RHFDateSearch
                            name='date'
                            label='Date de départ'
                            variant='caption'
                            height={17}
                            width={17}
                          />
                          <IconButton
                            variant='contained'
                            color='black'
                            sx={{
                              background: 'black',
                              borderRadius: 0.5,
                              width: { md: '8%' },
                              height: { md: '80%', xs: '50%' },
                              alignSelf: 'center',
                            }}
                          >
                            <Iconify
                              icon='fontisto:search'
                              color={'white'}
                              width={17}
                              height={17}
                            />
                          </IconButton>
                        </Stack>
                      </m.div>
                    </FormProvider> */
}

// const handleClick = (e) => {
//   const newEnd = e.lngLat;
//   const endPoint = Object.keys(newEnd).map((item, i) => newEnd[item]);
//   setEnd(endPoint);
// };

{
  /* <m.div>
              <Stack
                direction={{ sm: 'column', md: 'row' }}
                sx={{
                  backgroundColor: { md: 'white', sm: 'none' },
                  p: 1,
                  borderRadius: 2,
                }}
              >
                {!!errors.afterSubmit && (
                  <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                )}
                <Paper
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    marginBottom: { xs: 5, md: 0 },
                    width: { md: 400, xs: '90%' },
                  }}
                >
                  <RHFMapSearch name='departure' label='Point de départ' />
                </Paper>
                {isDesktop && (
                  <IconButton
                    sx={{ p: '10px' }}
                    onClick={() => handleSwapPoints()}
                  >
                    <Iconify icon='heroicons:arrows-right-left-20-solid' />
                  </IconButton>
                )}
                <Paper
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    marginBottom: { xs: 5, md: 0 },
                    width: { md: 400, xs: '90%' },
                  }}
                >
                  <RHFMapSearch name='destination' label='Destination' />
                </Paper>

                <Paper
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    mx: { sm: 0, md: 1 },
                    marginBottom: { xs: 5, md: 0 },
                    width: { md: 400, xs: '90%' },
                  }}
                >
                  <RHFDateSearch name='date' label='Date de départ' />

                  <LoadingButton
                    type='submit'
                    loading={isSubmitting}
                    sx={{
                      background: 'black',
                      borderRadius: 0.5,
                      width: { md: '25%' },
                      height: { md: '90%', xs: '50%' },
                      alignSelf: 'center',
                    }}
                  >
                    <Iconify
                      icon='fontisto:search'
                      color={'white'}
                      width={25}
                      height={25}
                    />
                  </LoadingButton>
                </Paper>
              </Stack>
            </m.div> */
}

const TRANSPORTERS = [
  {
    _id: '1',
    fName: 'Darrell',
    lName: 'Steward',
    photoUrl: '/assets/transporters/transporter1.png',
    images: [
      '/assets/transporters/transporter1.png',
      '/assets/transporters/transporter2.png',
      '/assets/transporters/transporter3.png',
      '/assets/transporters/transporter4.png',
    ],
    companyType: 'Agence',
    totalRating: 2.5,
    totalReview: 2577,
    ratings: [
      {
        name: '1 Star',
        starCount: 6728,
        reviewCount: 6767,
      },
      {
        name: '2 Star',
        starCount: 675,
        reviewCount: 1380,
      },
      {
        name: '3 Star',
        starCount: 2418,
        reviewCount: 1034,
      },
      {
        name: '4 Star',
        starCount: 587,
        reviewCount: 824,
      },
      {
        name: '5 Star',
        starCount: 1765,
        reviewCount: 574,
      },
    ],
    reviews: [
      {
        fName: 'Hicham',
        lName: 'HIcham',
        avatarUrl: '/assets/transporters/transporter1.png',
        postedAt: Date('12.09.2023'),
        rating: 4,
        comment:
          "je recommande a 100%, j'ai envoye des affaires au Maroc, le delais a ete respecte",
      },
    ],
    trajectory: {
      departurePoint: 'Berlin',
      departureCoordinates: [13.405, 52.52],
      departureTime: new Date('2022-03-25'),
      destinationPoint: 'Agadir',
      destinationCoordinates: [-9.5925, 30.428],
      destinationTime: new Date('2022-03-25'),
      checkPoints: [
        {
          city: 'Paris',
          time: Date('2022-03-25'),
          coordinates: [2.3483915, 48.8534951],
        },
        {
          city: 'Madrid',
          time: Date('2022-03-25'),
          coordinates: [-3.7038, 40.4168],
        },
        {
          city: 'Casablanca',
          time: Date('2022-03-25'),
          coordinates: [-6.834543, 34.022405],
        },
      ],
    },
  },
  {
    _id: '2',
    fName: 'John',
    lName: 'Doe',
    photoUrl: '/assets/transporters/transporter2.png',
    companyType: 'Transport',
    totalRating: 2.5,
    totalReview: 2577,
    ratings: [
      {
        name: '1 Star',
        starCount: 6728,
        reviewCount: 6767,
      },
      {
        name: '2 Star',
        starCount: 675,
        reviewCount: 1380,
      },
      {
        name: '3 Star',
        starCount: 2418,
        reviewCount: 1034,
      },
      {
        name: '4 Star',
        starCount: 587,
        reviewCount: 824,
      },
      {
        name: '5 Star',
        starCount: 1765,
        reviewCount: 574,
      },
    ],
    trajectory: {
      departurePoint: 'Greece',
      departureCoordinates: [21.8243, 39.0742],
      departureTime: new Date('2022-04-2'),
      destinationPoint: 'Italy',
      destinationCoordinates: [12.5674, 41.8719],
      destinationTime: new Date('2022-04-5'),
    },
  },
  {
    fName: 'Jane',
    lName: 'Doe',
    photoUrl: '/assets/transporters/transporter3.png',
    companyType: 'Agence',
    totalRating: 2.5,
    totalReview: 2577,
    ratings: [
      {
        name: '1 Star',
        starCount: 6728,
        reviewCount: 6767,
      },
      {
        name: '2 Star',
        starCount: 675,
        reviewCount: 1380,
      },
      {
        name: '3 Star',
        starCount: 2418,
        reviewCount: 1034,
      },
      {
        name: '4 Star',
        starCount: 587,
        reviewCount: 824,
      },
      {
        name: '5 Star',
        starCount: 1765,
        reviewCount: 574,
      },
    ],
  },
  {
    _id: '3',
    fName: 'Darrin',
    lName: 'Lenin',
    photoUrl: '/assets/transporters/transporter4.png',
    companyType: 'Agence',
    totalRating: 2.5,
    totalReview: 2577,
    ratings: [
      {
        name: '1 Star',
        starCount: 6728,
        reviewCount: 6767,
      },
      {
        name: '2 Star',
        starCount: 675,
        reviewCount: 1380,
      },
      {
        name: '3 Star',
        starCount: 2418,
        reviewCount: 1034,
      },
      {
        name: '4 Star',
        starCount: 587,
        reviewCount: 824,
      },
      {
        name: '5 Star',
        starCount: 1765,
        reviewCount: 574,
      },
    ],
  },
  {
    _id: '4',
    fName: 'Lisa',
    lName: 'Simspon',
    photoUrl: '/assets/transporters/transporter1.png',
    companyType: 'Agence',
    totalRating: 2.5,
    totalReview: 2577,
    ratings: [
      {
        name: '1 Star',
        starCount: 6728,
        reviewCount: 6767,
      },
      {
        name: '2 Star',
        starCount: 675,
        reviewCount: 1380,
      },
      {
        name: '3 Star',
        starCount: 2418,
        reviewCount: 1034,
      },
      {
        name: '4 Star',
        starCount: 587,
        reviewCount: 824,
      },
      {
        name: '5 Star',
        starCount: 1765,
        reviewCount: 574,
      },
    ],
  },
];


const TRANSPORTERSLIST = [
  {
    fName: 'Ahmed',
    lName: 'Ahmed',
    businessName: 'Ahmed transporter',
    email: 'ahmes@gmail.com',
    phone: '+212647484541',
    photoUrl:
      'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
    departure: 'Centre ville - Meknes',
    destination: 'Paris la defense',
    city: 'Paris',
  },
  {
    fName: 'Ahmed',
    lName: 'Ahmed',
    businessName: 'Ahmed transporter',
    email: 'ahmes@gmail.com',
    phone: '+212647484541',
    photoUrl:
      'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
    departure: 'Centre ville - Meknes',
    destination: 'Paris la defense',
    city: 'Paris',
  },
  {
    fName: 'Ahmed',
    lName: 'Ahmed',
    businessName: 'Ahmed transporter',
    email: 'ahmes@gmail.com',
    phone: '+212647484541',
    photoUrl:
      'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
    departure: 'Centre ville - Meknes',
    destination: 'Paris la defense',
    city: 'Paris',
  },
];


<Stack
direction={{ sm: 'column', md: 'row' }}
sx={{
  backgroundColor: { md: 'white', xs: 'primary.main' },
  p: { md: 1, xs: 3 },
  borderRadius: { md: 2, xs: 0 },
  mt: { md: 0, xs: '7vh' },
  width: { md: '42vw', xs: '100vw' },
}}
>