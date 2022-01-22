import React, { useState, useContext, useEffect } from 'react';
import { auth, db, storage } from '../../../firebase';
import Moment from 'moment';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const check22 = (number) => {
        while (number > 22) {
            number -= 22;
        }
        if (number == 0) number = 22;
        return number;
    }

    const digitSum = (number) => {
        let sum = 0;
        while (number) {
            sum += number % 10;
            number = Math.floor(number / 10);
        }
        return sum;
    }

    function identifyLanguage(name) {
        const en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        const kz = ['ң', 'ү', 'ә', 'і', 'ө', 'һ', 'ғ', 'қ', 'ұ']

        if (kz.some(substring => name.toLowerCase().includes(substring))) {
            return 'kz'
        } else if (en.some(substring => name.toLowerCase().includes(substring))) {
            return 'en'
        } else {
            return 'ru'
        }
    }

    function nameCalculation(name) {
        const ru = {
            1: ['а', 'и', 'с', 'Ъ'], 2: ['б', 'й', 'т', 'ы'], 3: ['в', 'к', 'у', 'ь'], 4: ['г', 'л', 'ф', 'э'],
            5: ['д', 'м', 'х', 'ю'], 6: ['е', 'н', 'ц', 'я'], 7: ['ё', 'о', 'ч'], 8: ['ж', 'п', 'ш'], 9: ['з', 'р', 'щ']
        }

        const en = {
            1: ['a', 'j', 's'], 2: ['b', 'k', 't'], 3: ['c', 'l', 'u'], 4: ['d', 'm', 'v'],
            5: ['e', 'n', 'w'], 6: ['f', 'o', 'x'], 7: ['g', 'p', 'y'], 8: ['h', 'q', 'z'], 9: ['i', 'r']
        }

        const kz = {
            1: ['а', 'ж', 'ң', 'ү', 'ы'], 2: ['ә', 'з', 'о', 'ф', 'і'], 3: ['б', 'и', 'ө', 'х', 'ь'], 4: ['в', 'й', 'п', 'һ', 'э'],
            5: ['г', 'к', 'р', 'ц', 'ю'], 6: ['ғ', 'қ', 'с', 'ч', 'я'], 7: ['д', 'л', 'т', 'ш'], 8: ['е', 'м', 'у', 'щ'], 9: ['ё', 'н', 'ұ', 'ъ']
        }

        let total = 0

        if (identifyLanguage(name) == 'kz') {
            for (var i = 0; i < name.length; i++) {
                for (const [key, value] of Object.entries(kz)) {
                    if (value.includes(name[i].toLowerCase())) {
                        total += Number(key)
                    }
                }
            }
        } else if (identifyLanguage(name) == 'en') {
            for (var i = 0; i < name.length; i++) {
                for (const [key, value] of Object.entries(en)) {
                    if (value.includes(name[i].toLowerCase())) {
                        total += Number(key)
                    }
                }
            }
        } else {
            for (var i = 0; i < name.length; i++) {
                for (const [key, value] of Object.entries(ru)) {
                    if (value.includes(name[i].toLowerCase())) {
                        total += Number(key)
                    }
                }
            }
        }

        return check22(total)
    }

    function featureCalculator(birthDate) {
        let dateArray = birthDate.split('-');
        let day = check22(parseInt(dateArray[2]));
        let month = parseInt(dateArray[1]);
        let year = parseInt(dateArray[0].slice(2));
        
        let tp = [];
        let opv = [];

        Number.prototype.inRange = function (a, b) {
            return this >= a && this <= b;
        };

        // TP calculation
        tp.push(check22(day + month));
        tp.push(check22(day + year));
        tp.push(check22(tp[0] + tp[1]));
        tp.push(check22(month + year));
        tp.push(check22(month + tp[2]));
        tp.push(check22(tp[0] + tp[1] + tp[2] + tp[3]));

        // OPV calculation
        opv.push(check22(Math.abs(day - month)));
        opv.push(check22(Math.abs(day - year)));
        opv.push(check22(Math.abs(opv[0] - opv[1])));
        opv.push(check22(Math.abs(month - year)));
        opv.push(check22(Math.abs(month - opv[2])));
        opv.push(check22(Math.abs(opv[0] + opv[1] + opv[2] + opv[3])));
        opv.push(check22(Math.abs(opv[5] - tp[5])));
        day.inRange(14, 22) ? opv.push(day) : console.log()

        tp = tp.filter((el) => !opv.includes(el))

        return {
            opv: opv,
            tp: tp,
        };
    }

    function featureObjectCalculator(birthDate) {
        let dateArray = birthDate.split('-');
        let day = check22(parseInt(dateArray[2]));
        let month = parseInt(dateArray[1]);
        let year = parseInt(dateArray[0].slice(2));

        let tp = [];
        let opv = [];

        Number.prototype.inRange = function (a, b) {
            return this >= a && this <= b;
        };

        // TP calculation
        tp.push(check22(day + month));
        tp.push(check22(day + year));
        tp.push(check22(tp[0] + tp[1]));
        tp.push(check22(month + year));
        tp.push(check22(month + tp[2]));
        tp.push(check22(tp[0] + tp[1] + tp[2] + tp[3]));

        // OPV calculation
        opv.push(check22(Math.abs(day - month)));
        opv.push(check22(Math.abs(day - year)));
        opv.push(check22(Math.abs(opv[0] - opv[1])));
        opv.push(check22(Math.abs(month - year)));
        opv.push(check22(Math.abs(month - opv[2])));
        opv.push(check22(Math.abs(opv[0] + opv[1] + opv[2] + opv[3])));
        opv.push(check22(Math.abs(opv[5] - tp[5])));
        day.inRange(14, 22) ? opv.push(day) : console.log()

        tp = tp.filter((el) => !opv.includes(el))

        let opvArray = []
        let tpArray = []

        for (let i in opv) {
            opvArray.push({
                id: opv[i],
                coeff: i == 0 ? 2 + getOccurrence(opv, opv[i]) : i == 1 ? 1.8 + getOccurrence(opv, opv[i]) : 1 + getOccurrence(opv, opv[i])
            })
        }

        for (let i in tp) {
            tpArray.push({
                id: tp[i],
                coeff: i == 0 ? 2 + getOccurrence(tp, tp[i]) : i == 1 ? 1.8 + getOccurrence(tp, tp[i]) : 1 + getOccurrence(tp, tp[i])
            })
        }

        return {
            opv: getFiltered(opvArray),
            tp: getFiltered(tpArray),
        };
    }

    function getFiltered(array) {
        const ids = array.map(o => o.id)
        const filtered = array.filter(({ id }, index) => !ids.includes(id, index + 1))
        return filtered;
    }

    function getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }

    function periodsCalculation(birthDate) {
        let periods = [];

        Date.prototype.addDays = function(days, index) {
            let startDate = new Date(this.valueOf());
            let endDate = new Date(this.valueOf());
            endDate.setDate(endDate.getDate() + days);
            periods.push(
                {
                    'id': index,
                    'from': Moment(startDate).format('MM-DD'),
                    'to': Moment(endDate).format('MM-DD')
                }
            );
            return endDate;
        };

        // Mercury
        const date = new Date(birthDate);
        let novelDate = date.addDays(52, 1);

        // Everything Else
        for (let iter = 2; iter <= 7; iter++) {
            novelDate.setDate(novelDate.getDate() + 1);
            novelDate = novelDate.addDays(51, iter);
        }

        return periods;
    }

    function monitorUpload(cred) {
        const externalImg = "https://firebasestorage.googleapis.com/v0/b/numerology-d24f2.appspot.com/o/images%2Favatar.png?alt=media&token=302e0809-28a8-44c4-b2db-262a77d68a62"
        storage.ref(`/images/${cred}`)
    }

    async function signup(email, password, birthDate, name, surname, additionals, referral) {
        let opvArray = [...new Set(featureCalculator(birthDate).opv)];
        let tpArray = [...new Set(featureCalculator(birthDate).tp)];
        let opvObjectArray = [...new Set(featureObjectCalculator(birthDate).opv)];
        let tpObjectArray = [...new Set(featureObjectCalculator(birthDate).tp)];
        let periodArray = [...new Set(periodsCalculation(birthDate))];
        let name_number = nameCalculation(name)
        let additionalArray = []

        for (let i in additionals) {
            additionalArray.push({
                id: additionals[i].id,
                name: additionals[i].name,
                status: true,
                color: additionals[i].default
                // СДЕЛАТЬ FALSE если делаем платным 
            })
        }

        return (
            await auth.createUserWithEmailAndPassword(email, password)
            .then(
                cred => 
                    db.collection("user").doc(cred.user.uid).set({
                        birth_date: birthDate,
                        name: name,
                        surname: surname,
                        opv: opvArray,
                        tp: tpArray,
                        opvObject: opvObjectArray,
                        tpObject: tpObjectArray,
                        periods: periodArray,
                        name_number: name_number,
                        additionals: additionalArray,
                        referral: referral
                    }).then(
                        monitorUpload(cred.user.uid)
                    )
            )
        );
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsibscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);  
        })

        return unsibscribe;
    }, [])

    const value = {
        currentUser,
        signup, 
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
