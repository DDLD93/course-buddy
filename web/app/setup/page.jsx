"use client"
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Autocomplete from '@mui/joy/Autocomplete';
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from '@mui/joy/CircularProgress';
import Link from 'next/link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ButtonStepper from '../(components)/Stepper';
import { WhatsAppinit } from './whatsApp-init';

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);

  const schools = [
    {
      id: 1,
      name: "Bayero university"
    },
    {
      id: 2,
      name: "Ahmadu bello university"
    },
    {
      id: 3,
      name: "Kaduna state university"
    },
    {
      id: 4,
      name: "Katsina state university"
    }
  ]
  const departments = [
    {
      id: 1,
      name: 'Department 1'
    },
    {
      id: 2,
      name: 'Aabbb'
    },
    {
      id: 3,
      name: 'Science'
    },
    {
      id: 4,
      name: 'Art'
    },
  ];

  const validationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    gender: yup.string().required('Gender is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    school: yup.string().required('School is required'),
    department: yup.string().required('Department is required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      school: '',
      department: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log(values);
    },
  });


  return (
    <Stack
      spacing={4}
      sx={{
        display: 'flex',
        width: '500px',
        mx: 'auto',
        px: {
          xs: 2,
          md: 6,
        },
        py: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Box >
        <Card sx={{ bgcolor: "teal", height: 500 }} >
          <ButtonStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          {activeStep == 1 && <>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
              <Typography level="body-sm">
                Customize how your profile information will apper to the networks.
              </Typography>
            </Box>
            <Divider />

            <Box
              direction="row"
              spacing={3} onSubmit={formik.handleSubmit}
              component={"form"}
              sx={{ display: 'flex', my: 1 }}
            >

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: {
                        sm: 'flex-column',
                        md: 'flex-row',
                      },
                      gap: 2,
                    }}
                  >
                    <Input
                      name='firstName'
                      size="sm"
                      error={formik.errors.firstName ? true : false}
                      placeholder={"First Name"}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Typography color='danger' mt={-2} fontSize={12}>{formik.errors.firstName}</Typography>
                    <Input
                      size="sm"
                      placeholder="Last name"
                      name='lastName'
                      error={formik.errors.lastName ? true : false}
                      sx={{ flexGrow: 1 }}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Typography color='danger' mt={-2} fontSize={12}>{formik.errors.firstName}</Typography>
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Stack direction="row">
                      <RadioGroup
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        row
                      >
                        <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                        <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                      </RadioGroup>
                    </Stack>
                    {formik.touched.gender && formik.errors.gender && (
                      <Typography color="danger" fontSize={12}>
                        {formik.errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name='phoneNumber'
                      size="sm"
                      error={formik.errors.phoneNumber ? true : false}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      startDecorator={<PhoneRoundedIcon />}
                      placeholder="Number"
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography color='danger' mt={-2} fontSize={12}>{formik.errors.phoneNumber}</Typography>
                  </FormControl>

                </Stack>
                <Stack direction="row" spacing={2}>


                  <FormControl
                    sx={{ flexGrow: 1 }}
                  >
                    <FormLabel>School</FormLabel>
                    <Select
                      name='school'
                      color={formik.errors.school ? "danger" : "primary"}
                      value={formik.values.school && formik.values.school?.name}
                      onChange={(e, value) => {
                        formik.setFieldValue('school', value)
                      }
                      }
                      onBlur={formik.handleBlur}
                      size="sm"
                      startDecorator={<SchoolRoundedIcon />}
                    >
                      {
                        schools.map((school) => (
                          <Option
                            key={school.id}
                            value={school.name}
                          >
                            <Typography textColor="text.tertiary" ml={0.5}>
                              {school.name}
                            </Typography>
                          </Option>
                        ))
                      }
                    </Select>
                    {formik.touched.school && formik.errors.school && (
                      <Typography color="danger" fontSize={12}>
                        {formik.errors.school}
                      </Typography>
                    )}
                  </FormControl >
                  <FormControl>
                    <FormLabel>Department</FormLabel>
                    <Autocomplete
                      error={formik.errors.department}
                      name='department'
                      value={formik.values.department?.name}
                      onChange={(e, value) => formik.setFieldValue('department', value?.name || "")}
                      onBlur={formik.handleBlur}
                      placeholder="Department"
                      getOptionLabel={(option) => option.name}
                      options={departments}

                    />
                    {formik.touched.department && formik.errors.department && (
                      <Typography color="danger" fontSize={12}>
                        {formik.errors.department}
                      </Typography>
                    )}
                  </FormControl>

                </Stack>

              </Stack>
            </Box>

            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button type='submit' size="sm" variant="solid"
                >
                  Register
                </Button>
              </CardActions>
            </CardOverflow>
          </>}
          {activeStep == 2 && <WhatsAppinit />}


        </Card>
      </Box>
    </Stack>
  );
};

export default Profile;


