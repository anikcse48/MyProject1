import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, DatePickerAndroid, ScrollView, TouchableOpacity, TouchableWithoutFeedbackComponent} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';




export default function DataCollectionForm() {
  // State to store the form data
  const [dateOfCollection, setDateOfCollection] = useState('');
  const [timeOfCollection, setTimeOfCollection] = useState('');
  const [hospitalAdmissionDate, setHospitalAdmissionDate] = useState('');
  const [hospitalAdmissionTime, setHospitalAdmissionTime] = useState('');
  const [hospitalRegistrationNumber, setHospitalRegistrationNumber] = useState('');
  const [womanName, setWomanName] = useState('');
  const [husbandName, setHusbandName] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [village, setVillage] = useState('');
  const [landmark, setLandmark] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [mobile3, setMobile3] = useState('');
  const [lmpDate, setLmpDate] = useState('');
  const [usgAvailable, setUsgAvailable] = useState('');
  const [usgDate, setUsgDate] = useState('');
  const [modeOfDelivery, setModeOfDelivery] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [outcome, setOutcome] = useState('');
  const [birthOrder1, setBirthOrder1] = useState({});
  const [birthOrder2, setBirthOrder2] = useState({});
  const [endInterviewTime, setEndInterviewTime] = useState('');
  const [paramedicName, setParamedicName] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const [isSex, setIsSex] =useState('');
  const [isSex1, setIsSex1] =useState('');
  const [isDiagnosed, setIsDiagnosed] =useState('');
  const [isDiagnosed1, setIsDiagnosed1] =useState('');
  const [isPerinatal, setIsPerinatal] =useState('');
  const [isPerinatal1, setIsPerinatal1] =useState('');
  const [isAdmitted, setIsAdmitted] =useState('');
  const [isAdmitted1, setIsAdmittedl] =useState('');
  const [isVentilator, setIsVentilator] =useState('');
  const [isVentilator1, setIsVentilator1] =useState('');
  const [isConvulsion, setIsConvulsion] =useState('');
  const [isConvulsion1, setIsConvulsion1] =useState('');
  const [somchChecked, setSomchChecked] = useState(false);
  const [swmchChecked, setSwmchChecked] = useState(false);
  const [somchChecked1, setSomchChecked1] = useState(false);
  const [swmchChecked1, setSwmchChecked1] = useState(false);


  



   // Function to handle checkbox change
   const handleCheckboxChange = (value, checkboxName) => {
    setCheckboxState({
      ...checkboxState, // Spread existing state
      [checkboxName]: value, // Update the specific checkbox's state
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!dateOfCollection || !womanName || !hospitalRegistrationNumber) {
      Alert.alert('Error', 'Please fill in all required fields!');
      return;
    }
    

    const formData = {
      dateOfCollection,
      timeOfCollection,
      hospitalAdmissionDate,
      hospitalAdmissionTime,
      hospitalRegistrationNumber,
      womanName,
      husbandName,
      district,
      upazila,
      village,
      landmark,
      mobile1,
      mobile2,
      mobile3,
      lmpDate,
      usgAvailable,
      usgDate,
      modeOfDelivery,
      deliveryDate,
      deliveryTime,
      outcome,
      birthOrder1,
      birthOrder2,
      endInterviewTime,
      paramedicName,
    };

    console.log('Form Data:', formData);
    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
       Projahnmo Research Foundation</Text>
       <View style={styles.rowContainer}>
  <View style={styles.formBox1}>
    <Text style={styles.header2}>Delivery and USG</Text>
  </View>
  <View style={styles.formBox2}>
    <Text style={styles.header3}>PROPs</Text>
  </View>
</View>
     <View style={styles.formBox3}>
    
     <Text style={styles.header4}>This form is to be completed for women who have delivered in the selected hospitals at obstetric department. Data will be collected electronically by Paramedics/Research Assistants/Study physician. </Text>
    </View>


    <View style={styles.container}>
      <Text style={styles.header2}>Hospital Selection:</Text>
      
      <View style={styles.checkboxContainer}>
        {/* SOMCH Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxWrapper} 
          onPress={() => setSomchChecked(!somchChecked)}
        >
          <View style={[styles.checkbox, somchChecked && styles.checked]}>
            {somchChecked && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.checkboxLabel}>SOMCH</Text>
        </TouchableOpacity>

        {/* SWMCH Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxWrapper} 
          onPress={() => setSwmchChecked(!swmchChecked)}
        >
          <View style={[styles.checkbox, swmchChecked && styles.checked]}>
            {swmchChecked && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.checkboxLabel}>SWMCH</Text>
        </TouchableOpacity>
      </View>
    </View>



    <View style={styles.container}>
      <Text style={styles.header2}>Data source:</Text>
      
      <View style={styles.checkboxContainer}>
        {/* Real-time data collection  */}
        <TouchableOpacity 
          style={styles.checkboxWrapper} 
          onPress={() => setSomchChecked1(!somchChecked1)}
        >
          <View style={[styles.checkbox, somchChecked1 && styles.checked]}>
            {somchChecked1 && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.checkboxLabel1}>Real-time data collection</Text>
        </TouchableOpacity>

        {/* Extraction from hospital record */}
        <TouchableOpacity 
          style={styles.checkboxWrapper} 
          onPress={() => setSwmchChecked1(!swmchChecked1)}
        >
          <View style={[styles.checkbox, swmchChecked1 && styles.checked]}>
            {swmchChecked1 && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.checkboxLabel1}>Extraction from hospital record</Text>
        </TouchableOpacity>
      </View>
    </View>
  
  


      {/* Section 1: Address and Identification Information */}
      <View tyle={styles.container}>
      <View style={styles.formBox}>
      <View style={styles.formBox}>
     
      <Text style={styles.header}>Address and Identification Information</Text>
      </View>

      <Text style={styles.label}>Date of Data Collection:</Text>
      <TextInput
        style={styles.input}
        value={dateOfCollection}
        onChangeText={setDateOfCollection}
        placeholder="DD/MM/YYYY"
      />
      <Text style={styles.label}>Time of Screening/Data Collection:</Text>
      <TextInput
        style={styles.input}
        value={timeOfCollection}
        onChangeText={setTimeOfCollection}
        placeholder="HH:MM"
      />
      <Text style={styles.label}>Hospital Admission Date:</Text>
      <TextInput
        style={styles.input}
        value={hospitalAdmissionDate}
        onChangeText={setHospitalAdmissionDate}
        placeholder="DD/MM/YYYY"
      />
      <Text style={styles.label}>Hospital Admission Time (24-hour clock):</Text>
      <TextInput
        style={styles.input}
        value={hospitalAdmissionTime}
        onChangeText={setHospitalAdmissionTime}
        placeholder="HH:MM"
      />
      <Text style={styles.label}>Hospital Registration Number:</Text>
      <TextInput
        style={styles.input}
        value={hospitalRegistrationNumber}
        onChangeText={setHospitalRegistrationNumber}
        placeholder="Enter registration number"
      />
      <Text style={styles.label}>Name of Woman:</Text>
      <TextInput
        style={styles.input}
        value={womanName}
        onChangeText={setWomanName}
        placeholder="Enter woman's name"
      />
      <Text style={styles.label}>Husband's Name:</Text>
      <TextInput
        style={styles.input}
        value={husbandName}
        onChangeText={setHusbandName}
        placeholder="Enter husband's name"
      />
      
      {/* Address Details */}
      <Text style={styles.label}>District:</Text>
      <Picker
        selectedValue={district}
        style={styles.picker}
        onValueChange={(itemValue) => setDistrict(itemValue)}>
        <Picker.Item label="Sylhet" value="01" />
        <Picker.Item label="Sunamganj" value="02" />
        <Picker.Item label="Moulvibazar" value="03" />
        <Picker.Item label="Habiganj" value="04" />
        <Picker.Item label="Others" value="09" />
      </Picker>
      {district === "09" && (
        <View style={styles.inputContainer}>
          <Text>Enter District Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type district name"
          
          />
        </View>
      )}
      <Text style={styles.label}>Upazila / City Corporation:</Text>
      <TextInput
        style={styles.input}
        value={upazila}
        onChangeText={setUpazila}
        placeholder="Enter upazila"
      />
      <Text style={styles.label}>Village / Ward:</Text>
      <TextInput
        style={styles.input}
        value={village}
        onChangeText={setVillage}
        placeholder="Enter village or ward"
      />
      <Text style={styles.label}>Landmark/Description:</Text>
      <TextInput
        style={styles.input}
        value={landmark}
        onChangeText={setLandmark}
        placeholder="Enter landmark or description"
      />
      <Text style={styles.label}>Mobile Number (Self):</Text>
      <TextInput
        style={styles.input}
        value={mobile1}
        onChangeText={setMobile1}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Mobile Number 2:</Text>
      <TextInput
        style={styles.input}
        value={mobile2}
        onChangeText={setMobile2}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Mobile Number 3:</Text>
      <TextInput
        style={styles.input}
        value={mobile3}
        onChangeText={setMobile3}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
      />
      </View>
      </View>
      
      

      {/* Section 2: Gestational Age */}
      <View tyle={styles.container}>
      <View style={styles.formBox}>
      <View style={styles.formBox}>
     
      <Text style={styles.header}>Gestational Age</Text>
      </View>
      
      <Text style={styles.label}>Does the woman know her LMP (1st date of last menstrual period)
         or is there LMP available for this woman in hospital records?</Text>
      <Picker
        selectedValue={usgAvailable}
        style={styles.picker}
        onValueChange={(itemValue) => setUsgAvailable(itemValue)}>
        <Picker.Item label="Yes" value="1" />
        <Picker.Item label="No" value="2" />
      </Picker>

      {usgAvailable === "1" && (
         <View style={styles.inputContainer}>
        <Text>Write the date of LMP for this women</Text>
      
        <TextInput
        style={styles.input}
        value={lmpDate}
        onChangeText={setLmpDate}
        placeholder="DD/MM/YYYY"
      />
      </View>
      )}


      {usgAvailable === "2" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Is there any prior USG report available for this pregnancy of the woman?</Text>
        <Picker
        selectedValue={usgDate}
        style={styles.picker}
        onValueChange={(itemValue) => setUsgDate(itemValue)}>
      
        <Picker.Item label="Yes" value="1" />
        <Picker.Item label="No" value="2" />
        <Picker.Item label="USG information not available in hospital record " value="3" />

      </Picker>
      </View>
    )}
    {usgDate === "1" && (
         <View style={styles.inputContainer}>
        <Text>Date of earliest USG report</Text>
      
        <TextInput
        style={styles.input}
        value={lmpDate}
        onChangeText={setLmpDate}
        placeholder="DD/MM/YYYY"
      />
      </View>
      )}

{usgDate === "1" && (
         <View style={styles.inputContainer}>
        <Text>GA on earliest USG report</Text>
      
        <TextInput
        style={styles.input}
        value={lmpDate}
        onChangeText={setLmpDate}
        placeholder="DD/MM/YYYY"
      />
      </View>
      )}

      {usgDate === "1" && (
         <View style={styles.inputContainer}>
        <Text>EDD on earliest USG report</Text>
      
        <TextInput
        style={styles.input}
        value={lmpDate}
        onChangeText={setLmpDate}
        placeholder="DD/MM/YYYY"
      />
      </View>
      )}
    </View>
    </View>
    
        {/* Section 3: Delivery Status */}
        <View tyle={styles.container}>
      <View style={styles.formBox}>
      <View style={styles.formBox}>
     
      <Text style={styles.header}>Delivery status of mother (select from drop down list)</Text>
      </View>
       
      {usgDate === '1' && (
        <>
          <Text style={styles.label}>Mode of Delivery:</Text>
      <Picker
        selectedValue={modeOfDelivery}
        style={styles.picker}
        onValueChange={(itemValue) => setModeOfDelivery(itemValue)}>
        <Picker.Item label="Normal Vaginal Delivery" value="1" />
        <Picker.Item label="Assisted Vaginal Delivery" value="2" />
        <Picker.Item label="Caesarian Section" value="3" />
      </Picker>
        </>
      )}
      
      {usgDate === '2' && (
        <>
          <Text style={styles.label}>Mode of Delivery:</Text>
      <Picker
        selectedValue={modeOfDelivery}
        style={styles.picker}
        onValueChange={(itemValue) => setModeOfDelivery(itemValue)}>
        <Picker.Item label="Normal Vaginal Delivery" value="1" />
        <Picker.Item label="Assisted Vaginal Delivery" value="2" />
        <Picker.Item label="Caesarian Section" value="3" />
      </Picker>
        </>
      )}

{usgDate === '3' && (
        <>
          <Text style={styles.label}>Mode of Delivery:</Text>
      <Picker
        selectedValue={modeOfDelivery}
        style={styles.picker}
        onValueChange={(itemValue) => setModeOfDelivery(itemValue)}>
        <Picker.Item label="Normal Vaginal Delivery" value="1" />
        <Picker.Item label="Assisted Vaginal Delivery" value="2" />
        <Picker.Item label="Caesarian Section" value="3" />
      </Picker>
        </>
      )}


      
      <Text style={styles.label}>Date of Delivery:</Text>
      <TextInput
        style={styles.input}
        value={deliveryDate}
        onChangeText={setDeliveryDate}
        placeholder="DD/MM/YYYY"
      />
      <Text style={styles.label}>Time of Delivery (24-hour clock):</Text>
      <TextInput
        style={styles.input}
        value={deliveryTime}
        onChangeText={setDeliveryTime}
        placeholder="HH:MM"
      />
       <Text style={styles.label}>GA of the mother on the date of delivery ):</Text>
      <TextInput
        style={styles.input}
        value={deliveryTime}
        onChangeText={setDeliveryTime}
        placeholder="WW/DD"
      />
      </View>
      </View>

      {/* Section 4: Outcome of Delivery */}
      <View tyle={styles.container}>
      <View style={styles.formBox}>
      <View style={styles.formBox}>
      <Text style={styles.header}>Outcome of Delivery</Text>
      </View>

      <Text style={styles.label}>What was the outcome of delivery?</Text>
    
      <Picker 
        selectedValue={outcome} 
        style={styles.picker} 
        onValueChange={(itemValue) => setOutcome(itemValue)}> 
        <Picker.Item label="Live Births" value="1" /> 
        <Picker.Item label="Still Births" value="2" /> 
      </Picker> 

      {outcome === "2" && (
         <View style={styles.inputContainer}>
        <Text style={styles.label}>End Time of Interview:</Text>
      <TextInput
        style={styles.input}
        value={endInterviewTime}
        onChangeText={setEndInterviewTime}
        placeholder="HH:MM"
      />
      </View>
      )}
      {outcome === "1" && (
         <View style={styles.inputContainer}>

      <View style={styles.formBox}>
      <Text style={styles.header1}>Birth order- 1</Text>
      </View>
      <Text style={styles.label}>Vital status of the child during data collection</Text>
    
    <Picker 
      selectedValue={birthOrder1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setBirthOrder1(itemValue)}> 
      <Picker.Item label="Alive" value="1" /> 
      <Picker.Item label="Death" value="2" /> 
    </Picker>

    {birthOrder1 === "2" && (
         <View style={styles.inputContainer}>
        <Text style={styles.label}>End Time of Interview:</Text>
      <TextInput
        style={styles.input}
        value={endInterviewTime}
        onChangeText={setEndInterviewTime}
        placeholder="HH:MM"
      />
      </View>
      )}
      
      {birthOrder1 === "1" && (
         <View style={styles.inputContainer}>

     <Text style={styles.label}>Sex of the baby</Text>
    
    <Picker 
      selectedValue={isSex} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsSex(itemValue)}> 
      <Picker.Item label="Male" value="1" /> 
      <Picker.Item label="Female" value="2" /> 
    </Picker>

    <Text style={styles.label}>Weight of the baby:</Text>
      <TextInput
        style={styles.input}
        value={endInterviewTime}
        onChangeText={setEndInterviewTime}
        placeholder="gm"
      />



    <Text style={styles.label}>Did the child diagnosed as neonatal sepsis after birth?</Text>
    
    <Picker 
      selectedValue={isDiagnosed} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsDiagnosed(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child had Perinatal asphyxia</Text>
    
    <Picker 
      selectedValue={isPerinatal} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsPerinatal(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child admitted in NICU/SCANU</Text>
    
    <Picker 
      selectedValue={isAdmitted} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsAdmitted(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child required ventilator/CPAP</Text>
    
    <Picker 
      selectedValue={isVentilator} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsVentilator(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child had any convulsion?</Text>
    
    <Picker 
      selectedValue={isConvulsion} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsConvulsion(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>




    </View>

    )}

</View>
      )}


      {outcome === "1" && (
         <View style={styles.inputContainer}>

      <View style={styles.formBox}>
      <Text style={styles.header1}>Birth order- 2</Text>
      </View>
      <Text style={styles.label}>Vital status of the child during data collection</Text>
    
    <Picker 
      selectedValue={birthOrder2} 
      style={styles.picker} 
      onValueChange={(itemValue) => setBirthOrder2(itemValue)}> 
      <Picker.Item label="Alive" value="1" /> 
      <Picker.Item label="Death" value="2" /> 
      <Picker.Item label="- -" value="3" /> 

    </Picker>

    {birthOrder2 === "2" && (
         <View style={styles.inputContainer}>
        <Text style={styles.label}>End Time of Interview:</Text>
      <TextInput
        style={styles.input}
        value={endInterviewTime}
        onChangeText={setEndInterviewTime}
        placeholder="HH:MM"
      />
      </View>
      )}
      
      {birthOrder2 === "1" && (
         <View style={styles.inputContainer}>

     <Text style={styles.label}>Sex of the baby</Text>
    
    <Picker 
      selectedValue={isSex1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsSex1(itemValue)}> 
      <Picker.Item label="Male" value="1" /> 
      <Picker.Item label="Female" value="2" /> 
    </Picker>

    <Text style={styles.label}>Weight of the baby:</Text>
      <TextInput
        style={styles.input}
        value={endInterviewTime}
        onChangeText={setEndInterviewTime}
        placeholder="gm"
      />



    <Text style={styles.label}>Did the child diagnosed as neonatal sepsis after birth?</Text>
    
    <Picker 
      selectedValue={isDiagnosed1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsDiagnosed1(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child had Perinatal asphyxia</Text>
    
    <Picker 
      selectedValue={isPerinatal1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsPerinatal1(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child admitted in NICU/SCANU</Text>
    
    <Picker 
      selectedValue={isAdmitted1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsAdmittedl(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child required ventilator/CPAP</Text>
    
    <Picker 
      selectedValue={isVentilator1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsVentilator1(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>

    <Text style={styles.label}>Did the child had any convulsion?</Text>
    
    <Picker 
      selectedValue={isConvulsion1} 
      style={styles.picker} 
      onValueChange={(itemValue) => setIsConvulsion1(itemValue)}> 
      <Picker.Item label="Yes" value="1" /> 
      <Picker.Item label="No" value="2" /> 
    </Picker>




    </View>

    )}

</View>
      )}



      {/* End Interview Time */}
      

      {/* Paramedic Name */}
      <Text style={styles.label}>Paramedic's Name and Code:</Text>
      <TextInput
        style={styles.input}
        value={paramedicName}
        onChangeText={setParamedicName}
        placeholder="Enter name and code"
      />
      </View>
      </View>
      

      {/* Submit Button */}
      
        
        <Button title="Submit" onPress={handleSubmit} />
      
    </ScrollView>

        


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,            // Adds border width
    borderColor: '#000',       // Border color, change to desired color
    borderRadius: 5,           // Rounded corners for the border
    paddingHorizontal: 10,     // Adds space inside the label (left and right)
    paddingVertical: 5,        
    
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
  },
  formBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  formBox1: {
    width: '45%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  
    
  },
  header2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'left',
  },

  header3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'left',
    color: '#fdfefe'
  },
  header4: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'left',
    
  },



  rowContainer: {
    flexDirection: 'row', // Align children in a row (side by side)
    justifyContent: 'space-between', // Optional: space between the boxes
    alignItems: 'center', // Optional: vertically center content in each box
  },
  formBox2: {
    width: '30%',
    padding: 20,
    backgroundColor: '#a93226',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },

  formBox3: {
    width: '100%',
    padding: 5,
    backgroundColor: '#e5e7e9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
   
  },

checkboxWrapper: {
  flexDirection: 'row', 
  alignItems: 'center', 
},
checkbox: {
  width: 20,
  height: 20,
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#333',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8, // Space between checkbox and label
},
checked: {
  backgroundColor: '#fdfefe', // white color when checked
  
},
checkmark: {
  color: '#1c2833', // Color of the checkmark
  fontSize: 14,
},
checkboxLabel: {
  fontSize: 14,
  color: '#333',
},

checkboxLabel1: {
  fontSize: 10,
  color: '#333',
},

checkboxContainer: {
  flexDirection: 'row', // Align checkboxes horizontally
  justifyContent: 'space-around', // Space out the checkboxes
  alignItems: 'center', // Align items vertically in the center
},



});

