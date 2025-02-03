document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        en: {
            switchLang: 'Switch to Arabic',
            captchaLabel: 'Captcha',
            refreshCaptcha: 'Refresh',
            validateCaptchaButton: 'Verify',
            invalidCaptcha: 'Invalid Captcha. Please try again',
            validCaptcha: 'Captcha verified successfully!',
            formTitle: 'Incident Report Form',
            // nameLabel: 'Full Name',
            // emailLabel: 'Email Address',
            subjectLabel: 'Subject',
            dateLabel: 'Reporting Date and Time',
            // timeLabel: 'Time',
            latitudeLabel: 'Latitude',
            longitudeLabel: 'Longitude',
            locationDescLabel: 'Location Description',
            contactLabel: 'Contact Details',
            descriptionLabel: 'Description of Incident',
            evidenceLabel: 'Evidence Attachment',
            captchaPlaceholder: 'Enter the Captcha',
            // namePlaceholder: 'Enter your Full Name',
            // emailPlaceholder: 'Enter your Email Address',
            subjectPlaceholder: 'Enter subject',
            latitudePlaceholder: 'Fetching latitude...',
            longitudePlaceholder: 'Fetching longitude...',
            locationDescPlaceholder: 'Enter your location description',
            contactPlaceholder: 'Enter your Contact Details',
            descriptionPlaceholder: 'Enter your Description of Incident',
            submiButton: 'Submit',
            locationFetchError: 'Unable to fetch location',
            submitting: 'Submitting...',
            formSuccess: 'Form submitted successfully',
            formError: 'Failed to submit the form',
        },
        ar: {
            switchLang: 'التبديل إلى الإنجليزية',
            captchaLabel: 'كلمة التحقق',
            refreshCaptcha: 'ينعش',
            validateCaptchaButton: 'يؤكد',
            invalidCaptcha: 'كلمة التحقق غير صالحة. يرجى المحاولة مرة أخرى',
            validCaptcha: 'تم التحقق من كلمة التحقق بنجاح!',
            formTitle: 'نموذج الإبلاغ عن الحادث',
            // nameLabel: 'الاسم الكامل',
            // emailLabel: 'عنوان البريد الإلكتروني',
            subjectLabel: 'Subject',
            dateLabel: 'Reporting Date and Time',
            // timeLabel: 'الوقت',
            latitudeLabel: 'خط العرض',
            longitudeLabel: 'خط الطول',
            locationDescLabel: 'Location Description',
            contactLabel: 'تفاصيل الاتصال',
            descriptionLabel: 'وصف الحادث',
            evidenceLabel: 'إرفاق الأدلة',
            captchaPlaceholder: 'أدخل كلمة التحقق',
            // namePlaceholder: 'أدخل اسمك الكامل',
            // emailPlaceholder: 'أدخل عنوان البريد الإلكتروني الخاص بك',
            subjectPlaceholder: 'Enter subject',
            latitudePlaceholder: 'جارٍ جلب خط العرض...',
            longitudePlaceholder: 'جارٍ جلب خط الطول...',
            locationDescPlaceholder: 'Enter your location description',
            contactPlaceholder: 'أدخل تفاصيل الاتصال الخاصة بك',
            descriptionPlaceholder: 'أدخل وصف الحادث الخاص بك',
            submiButton: 'يُقدِّم',
            locationFetchError: 'غير قادر على جلب الموقع',
            submitting: 'تقديم...',
            formSuccess: 'تم إرسال النموذج بنجاح',
            formError: 'فشل في إرسال النموذج',
        }
    };

    let currentLang = 'en';

    const switchLangBtn = document.getElementById('switchLang');
    const elementsToTranslate = [
        'captchaLabel',
        'refreshCaptcha',
        'validateCaptchaButton',
        'formTitle',
        'nameLabel',
        'emailLabel',
        'dateLabel',
        // 'timeLabel',
        'contactLabel',
        'descriptionLabel',
        'evidenceLabel',
        'submiButton',
    ];
    const placeholderToTranslate = [
        'captchaPlaceholder',
        // 'namePlaceholder',
        // 'emailPlaceholder',
        'subjectPlaceholder',
        'latitudePlaceholder',
        'longitudePlaceholder',
        'locationDescPlaceholder',
        'contactPlaceholder',
        'descriptionPlaceholder',
    ];

    switchLangBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        const translation = translations[currentLang];

        elementsToTranslate.forEach((id) => {
            document.getElementById(id).textContent = translation[id];
        });

        placeholderToTranslate.forEach((id) => {
            document.getElementsByClassName(id)[0].placeholder = translation[id];
        });

        switchLangBtn.textContent = translation.switchLang;

        document.body.style.direction = currentLang === 'en' ? 'ltr' : 'rtl';
    });

    // Function to generate random CAPTCHA string
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    };

    // Initialize CAPTCHA
    const captchaDisplay = document.getElementById('captchaDisplay');
    const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
    const captchaInput = document.getElementById('captchaInput');
    let currentCaptcha = generateCaptcha();
    captchaDisplay.textContent = currentCaptcha;

    // Refresh CAPTCHA
    refreshCaptchaBtn.addEventListener('click', () => {
        currentCaptcha = generateCaptcha();
        captchaDisplay.textContent = currentCaptcha;
        captchaMessage.textContent = '';
    });

    const captchaMessage = document.getElementById('captchaMessage');
    const validateCaptchaButton = document.getElementById('validateCaptchaButton');
    const contactForm = document.getElementById('contactForm');
    const captchaValidationSection = document.getElementById('captchaValidationSection');
    
    validateCaptchaButton.addEventListener('click', () => {
        captchaMessage.textContent = ''; 
        if (captchaInput.value === currentCaptcha) {
            captchaMessage.textContent = translations[currentLang].validCaptcha;
            captchaMessage.className = 'message success';

            captchaValidationSection.style.display = 'none';
            contactForm.style.display = 'block';

            fetchAndAutofillDetails()
        } else {
            captchaMessage.textContent = translations[currentLang].invalidCaptcha;
            captchaMessage.className = 'message error';
        }
    });

    function fetchAndAutofillDetails() {
        const dateField = document.getElementById('reportingDateTime');

        const now = new Date();
        dateField.value = now;

        const latitudeField = document.getElementById('latitude');
        const longitudeField = document.getElementById('longitude');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    latitudeField.value = latitude.toFixed(6);
                    longitudeField.value = longitude.toFixed(6);
                },
                (error) => {
                    latitudeField.value = translations[currentLang].locationFetchError;
                    longitudeField.value = translations[currentLang].locationFetchError;
                }
            );
        } else {
            latitudeField.value = 'Geolocation not supported';
        }
    }

    // Handle file upload
    let fileUploadResult;
    const evidenceInput = document.getElementById('evidence');
    evidenceInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const response = await uploadFileAsBlob(file);
                if (response.ok) {
                    fileUploadResult = await response.json();
                    console.log('File uploaded successfully:', fileUploadResult);
                    alert('File uploaded successfully!');
                } else {
                    throw new Error('Failed to upload the file');
                }
            } catch (error) {
                console.error('Error during file upload:', error);
                alert('Error uploading the file. Please try again.');
            }
        } else {
            console.warn('No file selected for upload.');
        }
    });

    async function uploadFileAsBlob(file) {
        const buf = await fileToBlob(file);

        const response = await fetch('https://racsharikitest.appiancloud.com/suite/webapi/uploadDocument', {
            method: 'POST',
            headers: {
                'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYjgwMjdlMi0wMmQ3LTZhMjItMzA4Zi1lMjI0N2ViZGI0NTkifQ.vtwQw8tQH06ftW-C3guvW9oPn15SHjDPNLydTLZpAf4',
                'Content-Type': file?.type, 
            },
            body: buf,
        });

        return response;
    }

    function fileToBlob(file) {
        return new Promise((resolve) => {
            resolve(new Blob([file]));
        });
    }

    // Get current route path and query params
    const getCurrentRouteInfo = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            currentPath: window.location.pathname,
            params: Object.fromEntries(params.entries())
        };
    };

    const routeInfo = getCurrentRouteInfo();
    // console.log('routeInfo: ', routeInfo);

    document?.getElementById('contactForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const messageElement = document.getElementById('message');
        messageElement.className = 'message';
        messageElement.textContent = '';

        const payload = {
            moduleId: 694,
            isSecurity: routeInfo?.params?.type?.toLowerCase()=="security",
            params: getModPayload(Object.fromEntries(new FormData(event.target)), fileUploadResult),
        }

        try {
            messageElement.textContent = translations[currentLang].submitting;
            const response = await fetch('https://racsharikitest.appiancloud.com/suite/webapi/createCase', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYjgwMjdlMi0wMmQ3LTZhMjItMzA4Zi1lMjI0N2ViZGI0NTkifQ.vtwQw8tQH06ftW-C3guvW9oPn15SHjDPNLydTLZpAf4',
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                messageElement.textContent = translations[currentLang].formSuccess;
                messageElement.className = 'message success';
                console.log('Response:', result);
            } else {
                throw new Error(translations[currentLang].formError);
            }
        } catch (error) {
            messageElement.textContent = error.message;
            messageElement.className = 'message error';
            console.error('Error:', error);
        }
    });
})

function getModPayload(data, fileUploadResult) {
    // console.log('data: ', data);
    // return data;
    return [
        {
            "fieldId": 1,
            "label": "Subject of Incident",
            "value": data?.subject,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "b97732a0-c898-4ed1-a039-55ee85583b92",
            "fieldTypeId": 1
        },
        {
            "fieldId": 2,
            "label": "Date and time for reporting",
            "value": formatReportingDate(data?.reportingDateTime),
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "b671dfd3-44e1-4e56-8e8a-a611719b4bbb",
            "fieldTypeId": 1
        },
        {
            "fieldId": 4,
            "label": "Location",
            "value": createGoogleMapsLink(data?.latitude, data?.longitude),
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "ab7f39bb-09de-48f5-aa61-240692968739",
            "fieldTypeId": 1
        },
        {
            "fieldId": 5,
            "label": "Location Description",
            "value": data?.locationDesc,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "447c2b5b-40d3-45fa-884d-27158abf87ab",
            "fieldTypeId": 1
        },
        {
            "fieldId": 6,
            "label": "Description of Incident",
            "value": data?.description,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "2f4bed99-6658-43e2-ad14-0b7979d707af",
            "fieldTypeId": 1
        },
        {
            "fieldId": 7,
            "label": "Contact number",
            "value": data?.contact,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "2931036c-2f31-4cf0-918a-e77a6435c7a6",
            "fieldTypeId": 1
        },
        {
            "fieldId": 8,
            "label": "Evidence attachment",
            "value": fileUploadResult?.result?.docId,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                fileUploadResult?.result?.docId
            ],
            "fieldIdentifier": "25516306-5ee4-4a85-a655-d0447f29754a",
            "fieldTypeId": 10
        },
        {
            "fieldId": 9,
            "label": "Lat",
            "value": data?.latitude,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "f59c80d6-1ff5-410a-9376-70f15711831b",
            "fieldTypeId": 1
        },
        {
            "fieldId": 10,
            "label": "Lng",
            "value": data?.longitude,
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "baadc873-3805-4cf1-85a6-9b45a114e367",
            "fieldTypeId": 1
        },
        {
            "fieldId": 11,
            "label": "Date and time of the incident",
            "value": formatIncidentDate(data?.incidentDateTime),
            "gridResponse": [
                {}
            ],
            "slctdLabels": [
                ""
            ],
            "slctdValues": [
                null
            ],
            "documentIds": [
                null
            ],
            "fieldIdentifier": "9fb2422e-e559-4151-bd3b-36994de07753",
            "fieldTypeId": 1
        }
    ];
}

function createGoogleMapsLink(latitude, longitude) {
return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

function formatReportingDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}



function formatIncidentDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}
