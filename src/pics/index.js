import rowan_default from './rowan_atkinson/default.jpg';
import rowan_happy1 from './rowan_atkinson/happy/rowan_happy1.jpg';
import rowan_happy2 from './rowan_atkinson/happy/rowan-happy2.jpg';
import rowan_happy3 from './rowan_atkinson/happy/rowan-happy3.jpg';
import rowan_sad1 from './rowan_atkinson/sad/rowan_sad1.jpg';
import rowan_angry1 from './rowan_atkinson/angry/rowan_angry.jpg';
import rowan_surprise1 from './rowan_atkinson/surprise/rowan_surprise.jpg';


const data = {
  'Rowan Atkinson': {
    default: rowan_default,
    happy: {[rowan_happy1]: true, [rowan_happy2]: false, [rowan_happy3]: false},
    sad: {[rowan_sad1]: true},
    angry: {[rowan_angry1]: true} ,
    surprised: {[rowan_surprise1]: true}
  }

}



export default data;