import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, DatePickerAndroid, ScrollView, TouchableOpacity, TouchableWithoutFeedbackComponent} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import SQLite from 'react-native-sqlite-storage';





SQLite.enablePromise(true);

const db = SQLite.openDatabase(
  { name: 'my_database.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.log('Database open failed', error)
);

const initDatabase = async () => {
  try {
    const dbInstance = await db;
    console.log('Database Initialized:', dbInstance);
    // Proceed with your queries here
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};






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
  const [lmpDate2, setLmpDate2] = useState('');
  const [union, setUnion] = useState('');
  const [lmpDate1, setLmpDate1] = useState('');
  const [deliveryTime1, setDeliveryTime1] = useState('');
  



 
const createTable = (db) => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS women_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_of_collection TEXT,
        time_of_collection TEXT,
        hospital_admission_date TEXT,
        hospital_admission_time TEXT,
        hospital_registration_number TEXT,
        woman_name TEXT,
        husband_name TEXT,
        district TEXT,
        upazila TEXT,
        village TEXT,
        landmark TEXT,
        mobile1 TEXT,
        mobile2 TEXT,
        mobile3 TEXT,
        lmp_date TEXT,
        usg_available TEXT,
        usg_date TEXT,
        mode_of_delivery TEXT,
        delivery_date TEXT,
        delivery_time TEXT,
        outcome TEXT,
        birth_order1 TEXT,
        birth_order2 TEXT,
        end_interview_time TEXT,
        paramedic_name TEXT
      );`,
      () => console.log('Table created successfully!'),
      error => console.log('Error creating table: ', error)
    );
  });
};


const insertData = (db, formData) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO women_data (date_of_collection, time_of_collection, hospital_admission_date, hospital_admission_time, hospital_registration_number, woman_name, husband_name, district, upazila, village, landmark, mobile1, mobile2, mobile3, lmp_date, usg_available, usg_date, mode_of_delivery, delivery_date, delivery_time, outcome, birth_order1, birth_order2, end_interview_time, paramedic_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        formData.dateOfCollection,
        formData.timeOfCollection,
        formData.hospitalAdmissionDate,
        formData.hospitalAdmissionTime,
        formData.hospitalRegistrationNumber,
        formData.womanName,
        formData.husbandName,
        formData.district,
        formData.upazila,
        formData.village,
        formData.landmark,
        formData.mobile1,
        formData.mobile2,
        formData.mobile3,
        formData.lmpDate,
        formData.usgAvailable,
        formData.usgDate,
        formData.modeOfDelivery,
        formData.deliveryDate,
        formData.deliveryTime,
        formData.outcome,
        formData.birthOrder1,
        formData.birthOrder2,
        formData.endInterviewTime,
        formData.paramedicName
      ],
      () => {
        console.log('Data inserted successfully!');
      },
      error => {
        console.log('Error inserting data: ', error);
      }
    );
  });
};


const fetchData = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM women_data',
        [],
        (tx, results) => {
          const rows = results.rows;
          let data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        error => {
          reject('Error fetching data: ', error);
        }
      );
    });
  });
};


const updateData = (db, id, formData) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE women_data SET date_of_collection = ?, time_of_collection = ?, hospital_admission_date = ?, hospital_admission_time = ?, hospital_registration_number = ?, woman_name = ?, husband_name = ?, district = ?, upazila = ?, village = ?, landmark = ?, mobile1 = ?, mobile2 = ?, mobile3 = ?, lmp_date = ?, usg_available = ?, usg_date = ?, mode_of_delivery = ?, delivery_date = ?, delivery_time = ?, outcome = ?, birth_order1 = ?, birth_order2 = ?, end_interview_time = ?, paramedic_name = ? WHERE id = ?',
      [
        formData.dateOfCollection,
        formData.timeOfCollection,
        formData.hospitalAdmissionDate,
        formData.hospitalAdmissionTime,
        formData.hospitalRegistrationNumber,
        formData.womanName,
        formData.husbandName,
        formData.district,
        formData.upazila,
        formData.village,
        formData.landmark,
        formData.mobile1,
        formData.mobile2,
        formData.mobile3,
        formData.lmpDate,
        formData.usgAvailable,
        formData.usgDate,
        formData.modeOfDelivery,
        formData.deliveryDate,
        formData.deliveryTime,
        formData.outcome,
        formData.birthOrder1,
        formData.birthOrder2,
        formData.endInterviewTime,
        formData.paramedicName,
        id
      ],
      () => {
        console.log('Data updated successfully!');
      },
      error => {
        console.log('Error updating data: ', error);
      }
    );
  });
};


const deleteData = (db, id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM women_data WHERE id = ?',
      [id],
      () => {
        console.log('Data deleted successfully!');
      },
      error => {
        console.log('Error deleting data: ', error);
      }
    );
  });
};


  
    
    
          



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
      

{district === "01" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Upazila / City Corporation:</Text>
        <Picker
        selectedValue={upazila}
        style={styles.picker}
        onValueChange={(itemValue) => setUpazila(itemValue)}>
      
        <Picker.Item label="Sylhet city corporation" value="101" />
        <Picker.Item label="Sylhet Sadar (outside Sylhet city corporation" value="102" />
        <Picker.Item label="South Surma (outside Sylhet city corporation)" value="103" />
        <Picker.Item label="Golapganj" value="104" />
        <Picker.Item label="Biswanath" value="105" />
        <Picker.Item label="Companiganj" value="106" />
        <Picker.Item label="Gowainghat" value="107" />
        <Picker.Item label="Fenchuganj" value="108" />
        <Picker.Item label="Beanibazar" value="109" />
        <Picker.Item label="Osmaninagar" value="110" />
        <Picker.Item label="Zakiganj" value="111" />
        <Picker.Item label="Balaganj" value="112" />
        <Picker.Item label="Kanaighat" value="113" />
        <Picker.Item label="Jaintapur" value="114" />
        <Picker.Item label="Others" value="199" />

      </Picker>
      </View>
      )}

{upazila === "199" && (
        <View style={styles.inputContainer}>
        <Text>Enter Upazila Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type upazila name"
        
        />
        <Text>Enter Union Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type union name"
        
        />
      </View>
      )}



{district === "02" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Upazila / City Corporation:</Text>
        <Picker
        selectedValue={upazila}
        style={styles.picker}
        onValueChange={(itemValue) => setUpazila(itemValue)}>
      
        <Picker.Item label="Sunamganj Sador" value="201" />
        <Picker.Item label="Shantiganj" value="202" />
        <Picker.Item label="Bishwambarpur" value="203" />
        <Picker.Item label="Chhatakj" value="204" />
        <Picker.Item label="Jagannathpur" value="205" />
        <Picker.Item label="Tahirpur" value="206" />
        <Picker.Item label="Dharmapasha" value="207" />
        <Picker.Item label="Jamalganjj" value="208" />
        <Picker.Item label="Shalla" value="209" />
        <Picker.Item label="Derai" value="210" />
        <Picker.Item label="Dowarabazarj" value="211" />
        <Picker.Item label="Madhyanagar" value="212" />
        <Picker.Item label="Others" value="299" />

      </Picker>
      </View>
      )}

{upazila === "299" && (
        <View style={styles.inputContainer}>
        <Text>Enter Upazila Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type upazila name"
        
        />
        <Text>Enter Union Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type union name"
        
        />
      </View>
      )}


{district === "03" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Upazila / City Corporation:</Text>
        <Picker
        selectedValue={upazila}
        style={styles.picker}
        onValueChange={(itemValue) => setUpazila(itemValue)}>
      
        <Picker.Item label="Barlekha" value="301" />
        <Picker.Item label="Kamolganj" value="302" />
        <Picker.Item label="Kulaura" value="303" />
        <Picker.Item label="Moulvibazar sadar" value="304" />
        <Picker.Item label="Rajnagar" value="305" />
        <Picker.Item label="Sreemangal" value="306" />
        <Picker.Item label="Juri" value="307" />
        <Picker.Item label="Others" value="399" />

      </Picker>
      </View>
      )}

{upazila === "399" && (
        <View style={styles.inputContainer}>
        <Text>Enter Upazila Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type upazila name"
        
        />

<Text>Enter Union Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type union name"
        
        />
      </View>
      )}


{district === "04" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Upazila / City Corporation:</Text>
        <Picker
        selectedValue={upazila}
        style={styles.picker}
        onValueChange={(itemValue) => setUpazila(itemValue)}>
      
        <Picker.Item label="Madhabpur" value="401" />
        <Picker.Item label="Baniachong" value="402" />
        <Picker.Item label="Chunarughat" value="403" />
        <Picker.Item label="Bahubal" value="404" />
        <Picker.Item label="Ajmiriganj" value="405" />
        <Picker.Item label="Nabiganj" value="406" />
        <Picker.Item label="Habiganj sadar" value="407" />
        <Picker.Item label="Lakhai" value="408" />
        <Picker.Item label="Shayestaganj" value="409" />
        <Picker.Item label="Others" value="499" />

      </Picker>
      </View>
      )}

{upazila === "499" && (
        <View style={styles.inputContainer}>
        <Text>Enter Upazila Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type upazila name"
        
        />
        <Text>Enter Union Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type union name"
        
        />
      </View>
      )}



{district === "09" && (
        <View style={styles.inputContainer}>
        <Text>Enter District Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type district name"
          />

          <Text>Enter Upazila Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type upazila name"
        
        />

<Text>Enter Union Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type union name"
        
        />
        
        
      </View>
      )}





{upazila === "101" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
      
        <Picker.Item label="Word 1" value="1001" />
        <Picker.Item label="Word 2" value="1002" />
        <Picker.Item label="Word 3" value="1003" />
        <Picker.Item label="Word 4" value="1004" />
        <Picker.Item label="Word 5" value="1005" />
        <Picker.Item label="Word 6" value="1006" />
        <Picker.Item label="Word 7" value="1007" />
        <Picker.Item label="Word 8" value="1008" />
        <Picker.Item label="Word 9" value="1009" />
        <Picker.Item label="Word 10" value="1010" />
        <Picker.Item label="Word 11" value="1011" />
        <Picker.Item label="Word 12" value="1012" />
        <Picker.Item label="Word 13" value="1013" />
        <Picker.Item label="Word 14" value="1014" />
        <Picker.Item label="Word 15" value="1015" />
        <Picker.Item label="Word 16" value="1016" />
        <Picker.Item label="Word 17" value="1017" />
        <Picker.Item label="Word 18" value="1018" />
        <Picker.Item label="Word 19" value="1019" />
        <Picker.Item label="Word 20" value="1020" />
        <Picker.Item label="Word 21" value="1021" />
        <Picker.Item label="Word 22" value="1022" />
        <Picker.Item label="Word 23" value="1023" />
        <Picker.Item label="Word 24" value="1024" />
        <Picker.Item label="Word 25" value="1025" />
        <Picker.Item label="Word 26" value="1026" />
        <Picker.Item label="Word 27" value="1027" />
        <Picker.Item label="Word 28" value="1028" />
        <Picker.Item label="Word 29" value="1029" />
        <Picker.Item label="Word 30" value="1030" />
        <Picker.Item label="Word 31" value="1031" />
        <Picker.Item label="Word 32" value="1032" />
        <Picker.Item label="Word 33" value="1033" />
        <Picker.Item label="Word 34" value="1034" />
        <Picker.Item label="Word 35" value="1035" />
        <Picker.Item label="Word 36" value="1036" />
        <Picker.Item label="Word 37" value="1037" />
        <Picker.Item label="Word 38" value="1038" />
        <Picker.Item label="Word 39" value="1039" />
        <Picker.Item label="Word 40" value="1040" />
        <Picker.Item label="Word 41" value="1041" />
        <Picker.Item label="Word 42" value="1042" />


      </Picker>
      </View>
      )}

      {upazila === "102" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Jalalabad" value="1043" />
        <Picker.Item label="Hatkhula" value="1044" />
        <Picker.Item label="Khadimnagar" value="1045" />
        <Picker.Item label="Khadimpara" value="1046" />
        <Picker.Item label="Tultikor" value="1047" />
        <Picker.Item label="Tukerbazar" value="1048" />
        <Picker.Item label="Mugolgaon" value="1049" />
        <Picker.Item label="Kandigaon" value="1050" />

      </Picker>
      </View>
      )}



{upazila === "103" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Lalabazar" value="1051" />
        <Picker.Item label="Moglabazar" value="1052" />
        <Picker.Item label="Boroikandi" value="1053" />
        <Picker.Item label="Silam" value="1054" />
        <Picker.Item label="Daudpur" value="1055" />
        <Picker.Item label="Mollargao" value="1056" />
        <Picker.Item label="Kuchai" value="1057" />
        <Picker.Item label="Kamalbazar" value="1058" />
        <Picker.Item label="Jalalpur" value="1059" />
        <Picker.Item label="Tetli" value="1060" />

      </Picker>
      </View>
      )}




{upazila === "104" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Lakshmipasha" value="1061" />
        <Picker.Item label="Budhbaribazar" value="1062" />
        <Picker.Item label="Dhakadakshin" value="1063" />
        <Picker.Item label="Sharifganj" value="1064" />
        <Picker.Item label="Uttarbadepasha" value="1065" />
        <Picker.Item label="Lakshanaband" value="1066" />
        <Picker.Item label="Bhadeshwar" value="1067" />
        <Picker.Item label="Westamura" value="1068" />
        <Picker.Item label="Bagha" value="1069" />
      </Picker>
      </View>
      )}


{upazila === "105" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Rampasha " value="1070" />
        <Picker.Item label="Lamakaz" value="1071" />
        <Picker.Item label="Khajanchi" value="1072" />
        <Picker.Item label="Alankari" value="1073" />
        <Picker.Item label="Dewkalash" value="1074" />
        <Picker.Item label="Bishwanath" value="1075" />
        <Picker.Item label="Doshghar" value="1076" />
        <Picker.Item label="Daulatpur" value="1077" />
        
      </Picker>
      </View>
      )}


{upazila === "106" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Telikhal " value="1078" />
        <Picker.Item label="Islampurpaschim" value="1079" />
        <Picker.Item label="Islampurpurba" value="1080" />
        <Picker.Item label="Isakalas" value="1081" />
        <Picker.Item label="Uttorronikhai" value="1082" />
        <Picker.Item label="Dakkinronikhai" value="1083" />
        
        
      </Picker>
      </View>
      )}


{upazila === "107" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Fothepur " value="1084" />
        <Picker.Item label="Rustampur" value="1085" />
        <Picker.Item label="Paschimjaflong" value="1086" />
        <Picker.Item label="Purbajaflong" value="1087" />
        <Picker.Item label="Lengura" value="1088" />
        <Picker.Item label="Alirgaon" value="1089" />
        <Picker.Item label="Nandirgaon" value="1090" />
        <Picker.Item label="Towakul" value="1091" />
        <Picker.Item label="Daubari" value="1092" />
        <Picker.Item label="Gowainghatsadar" value="1093" />
        <Picker.Item label="Paschimalirgaon" value="1094" />
        
        
      </Picker>
      </View>
      )}

{upazila === "108" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Ghilachora " value="1095" />
        <Picker.Item label="Fenchuganj" value="1096" />
        <Picker.Item label="Uttarkushiara" value="1097" />
        <Picker.Item label="Uttarfenchuganj" value="1098" />
        <Picker.Item label="Maijgaon" value="1099" />
        
        
      </Picker>
      </View>
      )}

{upazila === "109" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Tilparaup " value="1100" />
        <Picker.Item label="Alinagar" value="1101" />
        <Picker.Item label="Charkhai" value="1102" />
        <Picker.Item label="Dubag" value="1103" />
        <Picker.Item label="Sheola" value="1104" />
        <Picker.Item label="Kurarbazar " value="1105" />
        <Picker.Item label="Mathiura" value="1106" />
        <Picker.Item label="Mullapur" value="1107" />
        <Picker.Item label="Muria" value="1108" />
        <Picker.Item label="Lauta" value="1109" />
        
        
      </Picker>
      </View>
      )}


{upazila === "110" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Tazpur " value="1110" />
        <Picker.Item label="Umorpur" value="1111" />
        <Picker.Item label="Westpoilanpur" value="1112" />
        <Picker.Item label="Burungabazar" value="1113"/>
        <Picker.Item label="Goalabazar" value="1114" />
        <Picker.Item label="Doyamir " value="1115" />
        <Picker.Item label="Usmanpur" value="1116" />
        <Picker.Item label="Sadipur" value="1117" />
      </Picker>
      </View>
      )}



{upazila === "111" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Manikpur " value="1118" />
        <Picker.Item label="Sultanpur" value="1119" />
        <Picker.Item label="Barohal" value="1120" />
        <Picker.Item label="Kajalshah" value="1121"/>
        <Picker.Item label="kholachora" value="1122" />
        <Picker.Item label="Zakiganj " value="1123" />
        <Picker.Item label="Barothakuri" value="1124" />
        <Picker.Item label="Kaskanakpur" value="1125" />
      </Picker>
      </View>
      )}



{upazila === "112" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Eastpoilanpur " value="1126" />
        <Picker.Item label="Boaljur" value="1127" />
        <Picker.Item label="Dewanbazar" value="1128" />
        <Picker.Item label="Westgouripur" value="1129"/>
        <Picker.Item label="Westgouripur" value="1130" />
        <Picker.Item label="Eastgouripur " value="1131" />
        <Picker.Item label="Balaganj" value="1132" />
       
      </Picker>
      </View>
      )}


{upazila === "113" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Rajagonj " value="1133" />
        <Picker.Item label="Lakshiprashadpurbo" value="1134" />
        <Picker.Item label="Lakshiprashadpashim" value="1135" />
        <Picker.Item label="Digirparpurbo" value="1136"/>
        <Picker.Item label="Satbakh" value="1137" />
        <Picker.Item label="Barachotul " value="1138" />
        <Picker.Item label="Kanaighat" value="1139" />
        <Picker.Item label="Dakhinbanigram " value="1140" />
        <Picker.Item label="Jinghabari" value="1141" />
       
      </Picker>
      </View>
      )}



{upazila === "114" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Nijpat " value="1142" />
        <Picker.Item label="Jaintapur" value="1143" />
        <Picker.Item label="Charikatha" value="1144" />
        <Picker.Item label="Darbast" value="1145"/>
        <Picker.Item label="Fatehpur" value="1146" />
        <Picker.Item label="Chiknagul " value="1147" />
       
      </Picker>
      </View>
      )}



{upazila === "201" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Jahangirnagar " value="2001" />
        <Picker.Item label="Rangarchar" value="2002" />
        <Picker.Item label="Kurbannagar" value="2003" />
        <Picker.Item label="Gourarang" value="2004"/>
        <Picker.Item label="Mollapara" value="2005" />
        <Picker.Item label="Laxmansreen " value="2006" />
        <Picker.Item label="Kathair" value="2007" />
        <Picker.Item label="Surma " value="2008" />
        <Picker.Item label="Mohonpur " value="2009" />
       
      </Picker>
      </View>
      )}



{upazila === "202" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Shimulbak " value="2010" />
        <Picker.Item label="Paschimpagla" value="2011" />
        <Picker.Item label="Joykalash" value="2012" />
        <Picker.Item label="Purbapagla" value="2013"/>
        <Picker.Item label="Patharia" value="2014" />
        <Picker.Item label="Purbabirgaon " value="2015" />
        <Picker.Item label="Dargapasha" value="2016" />
        <Picker.Item label="Paschimbirgaon " value="2017" />
      
       
      </Picker>
      </View>
      )}

{upazila === "203" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Palash " value="2018" />
        <Picker.Item label="Solukabad" value="2019" />
        <Picker.Item label="Badaghatsouth" value="2020" />
        <Picker.Item label="Fatepur" value="2021"/>
        <Picker.Item label="Dhanpur" value="2022" />
      </Picker>
      </View>
      )}


{upazila === "204" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Islampur " value="2023" />
        <Picker.Item label="Noarai" value="2024" />
        <Picker.Item label="Chhataksadar" value="2025" />
        <Picker.Item label="Gobindganjsyedergaon" value="2026"/>
        <Picker.Item label="Kalaruka" value="2027" />
        <Picker.Item label="Chhailaafjalabad " value="2028" />
        <Picker.Item label="Khurmanorth" value="2029" />
        <Picker.Item label="khurmasouth" value="2030" />
        <Picker.Item label="Chormohalla" value="2031"/>
        <Picker.Item label="Jauwabazar" value="2032" />
        <Picker.Item label="Singchapair " value="2033" />
        <Picker.Item label="Dolarbazar" value="2034" />
        <Picker.Item label="Bhatgaon" value="2035" />
      </Picker>
      </View>
      )}




{upazila === "205" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Kolkolia " value="2036" />
        <Picker.Item label="Patli" value="2037" />
        <Picker.Item label="Mirpur" value="2038" />
        <Picker.Item label="Chilauraholdipur" value="2039"/>
        <Picker.Item label="Raniganj" value="2040" />
        <Picker.Item label="Syedpurshaharpara " value="2041" />
        <Picker.Item label="Asharkandi" value="2042" />
        <Picker.Item label="Pailgaon" value="2043" />
        
      </Picker>
      </View>
      )}



{upazila === "206" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Sreepurnorth " value="2044" />
        <Picker.Item label="Sreepursouth" value="2045" />
        <Picker.Item label="Bordalsouth" value="2046" />
        <Picker.Item label="Bordalnorth" value="2047"/>
        <Picker.Item label="Badaghat" value="2048" />
        <Picker.Item label="Tahirpursadar " value="2049" />
        <Picker.Item label="Balijuri" value="2050" />
        
        
      </Picker>
      </View>
      )}


{upazila === "207" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Bongshikundanorth " value="2051" />
        <Picker.Item label="Bongshikundasouth" value="2052" />
        <Picker.Item label="Chamordani" value="2053" />
        <Picker.Item label="Madhyanagar" value="2054"/>
        <Picker.Item label="Paikurati" value="2055" />
        <Picker.Item label="Selbarash " value="2056" />
        <Picker.Item label="Dharmapashasadar" value="2057" />
        <Picker.Item label="Joyasree " value="2058" />
        <Picker.Item label="Sukhairrajapursouth" value="2059" />
        
        
      </Picker>
      </View>
      )}


{upazila === "208" && (
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Union:</Text>
        <Picker
        selectedValue={union}
        style={styles.picker}
        onValueChange={(itemValue) => setUnion(itemValue)}>
    
        <Picker.Item label="Bongshikundanorth " value="2051" />
        <Picker.Item label="Bongshikundasouth" value="2052" />
        <Picker.Item label="Chamordani" value="2053" />
        <Picker.Item label="Madhyanagar" value="2054"/>
        <Picker.Item label="Paikurati" value="2055" />
        <Picker.Item label="Selbarash " value="2056" />
        <Picker.Item label="Dharmapashasadar" value="2057" />
        <Picker.Item label="Joyasree " value="2058" />
        <Picker.Item label="Sukhairrajapursouth" value="2059" />
        
        
      </Picker>
      </View>
      )}












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
        value={lmpDate1}
        onChangeText={setLmpDate1}
        placeholder="DD/MM/YYYY"
      />
      </View>
      )}

{usgDate === "1" && (
         <View style={styles.inputContainer}>
        <Text>GA on earliest USG report</Text>
      
        <TextInput
        style={styles.input}
        value={lmpDate2}
        onChangeText={setLmpDate2}
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
        value={deliveryTime1}
        onChangeText={setDeliveryTime1}
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
    height: 60,
    width: 350,
   
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,            // Adds border width
    borderColor: '#000',       // Border color, change to desired color
    borderRadius: 5,           // Rounded corners for the border
    paddingHorizontal: 10,     // Adds space inside the label (left and right)
    paddingVertical: 5, 
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

