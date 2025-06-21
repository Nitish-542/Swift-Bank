import appointment_img from './banner.png'
import header_img from './header.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about.png'
import logo from './bblogo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import emp1 from './1.png'
import emp2 from './2.png'
import emp3 from './3.png'
import emp4 from './4.png'
import emp5 from './5.png'
import emp6 from './6.png'
import emp7 from './7.png'
import emp8 from './8.png'
import emp9 from './9.png'
import emp10 from './10.png'
import emp11 from './11.png'
import emp12 from './12.png'
import emp13 from './13.png'
import emp14 from './14.png'
import emp15 from './15.png'
import Account from './account.png'
import Business from './business.png'
import Loan from './loan.png'
import Mortgage from './mortgage.png'
import Investment from './invest.png'
import Credit from './credit.png'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon
}

export const specialityData = [
    {
        speciality: 'Personal Loans',
        image: Loan
    },
    {
        speciality: 'Mortgage Services',
        image: Mortgage
    },
    {
        speciality: 'Savings & Checking Accounts',
        image: Account
    },
    {
        speciality: 'Credit Card Services',
        image: Credit
    },
    {
        speciality: 'Investment and Wealth Management',
        image: Investment
    },
    {
        speciality: 'Business Banking Solutions',
        image: Business
    },
]

export const employees = [
    {
        _id: 'emp1',
        name: 'Richard James',
        image: emp1,
        speciality: 'Personal Loans',
        position: 'Loan Officer',
        degree: 'MFin',
        experience: '4 Years',
        about: 'Richard brings years of experience in financial lending and is deeply committed to helping individuals achieve their financial dreams. With a genuine passion for assisting clients in securing the right personal loans, Richard takes pride in finding the best solutions tailored to each person’s unique situation. Known for their approachability and expertise, Richard has guided countless customers through the lending process, ensuring a smooth and supportive experience from start to finish.',
        address: {
            line1: '123 Queen St W',
            line2: 'Toronto, ON M5H 2M9'
        }
    },
    {
        _id: 'emp2',
        name: 'John Larson',
        image: emp2,
        speciality: 'Credit Card Services',
        position: 'Credit Analyst',
        degree: 'MSc',
        experience: '3 Years',
        about: 'John has a deep expertise in credit card services, working tirelessly to help customers find the right options that fit their financial goals. With a background in credit solutions, John takes pride in understanding individual needs—whether its helping to build credit, finding the best rewards, or managing credit responsibly. They are known for their customer-first approach, guiding clients toward making informed decisions that positively impact their financial well-being.',
        address: {
            line1: '456 King St E',
            line2: 'Toronto, ON M5A 1L1'
        }
    },
    {
        _id: 'emp3',
        name: 'Timothy White',
        image: emp3,
        speciality: 'Mortgage Services',
        position: 'Mortgage Advisor',
        degree: 'RETI',
        experience: '1 Years',
        about: 'Timothy is a dedicated mortgage expert with a background in real estate and banking. Over the years, they have developed a deep understanding of the complexities surrounding homeownership and are passionate about helping individuals and families secure their dream homes. Timothy believes in providing transparent, honest advice and is known for their ability to make the mortgage process seamless, offering clients peace of mind as they take the next step toward homeownership.',
        address: {
            line1: '789 Bloor St W',
            line2: 'Toronto, ON M6G 1L3'
        }
    },
    {
        _id: 'emp4',
        name: 'Christopher Lee',
        image: emp4,
        speciality: 'Personal Loans',
        position: 'Loan Officer',
        degree: 'MCom',
        experience: '2 Years',
        about: 'Christopher brings a wealth of experience and a personal touch to helping clients secure the right loan for their individual needs. Whether youre planning a big event, making a major purchase, or consolidating debt, Christopher takes the time to understand your goals and offer tailored advice. Their commitment to making the loan process stress-free is reflected in the trust and satisfaction of countless clients.',
        address: {
            line1: '321 College St',
            line2: 'Toronto, ON M5T 1S1'
        }
    },
    {
        _id: 'emp5',
        name: 'Jennifer Garcia',
        image: emp5,
        speciality: 'Investment and Wealth Management',
        position: 'Wealth Advisor',
        degree: 'MBA',
        experience: '4 Years',
        about: 'With a keen eye for market trends and a deep commitment to growing client portfolios, Jennifer is a seasoned expert in investment and wealth management. Their passion lies in creating customized strategies that help clients build and protect their wealth over time. Jennifer is not only an advocate for smart financial planning but also an educator, ensuring their clients fully understand the investment landscape and are empowered to make informed decisions for their future.',
        address: {
            line1: '234 Front St',
            line2: 'Toronto, ON M5J 2X1'
        }
    },
    {
        _id: 'emp6',
        name: 'Ava Mitchell',
        image: emp6,
        speciality: 'Business Banking Solutions',
        position: 'Business Banker',
        degree: 'MS',
        experience: '4 Years',
        about: 'Ava has a rich background in business banking, having worked with entrepreneurs and businesses of all sizes to develop tailored financial solutions. Known for their strategic thinking and personalized approach, Ava helps businesses thrive by providing comprehensive banking services—from everyday transactions to long-term growth plans. Their passion lies in empowering businesses to succeed by ensuring they have the financial tools they need to flourish in today’s competitive market.',
        address: {
            line1: '567 Bay St',
            line2: 'Toronto, ON M5G 2C2'
        }
    },
    {
        _id: 'emp7',
        name: 'Christopher Davis',
        image: emp7,
        speciality: 'Investment and Wealth Management',
        position: 'Wealth Advisor',
        degree: 'CFA',
        experience: '4 Years',
        about: 'With a passion for financial growth and long-term planning, Christopher has become a trusted advisor in investment and wealth management. Their dedication to building personalized investment strategies allows clients to meet their financial goals with confidence. Christopher’s approach is rooted in a deep understanding of market trends and client aspirations, ensuring that wealth-building opportunities are maximized while risks are carefully managed.',
        address: {
            line1: '999 Dundas St E',
            line2: 'Toronto, ON M4M 1S3'
        }
    },
    {
        _id: 'emp8',
        name: 'Rutvi Patel',
        image: emp8,
        speciality: 'Mortgage Services',
        position: 'Mortgage Advisor',
        degree: 'MSRE',
        experience: '3 Years',
        about: 'Rutvi has built a reputation as a reliable and insightful mortgage advisor, dedicated to helping clients navigate the path to homeownership. With a deep knowledge of the housing market and various mortgage products, Rutvi works tirelessly to match clients with the best mortgage solutions. Their attention to detail and commitment to client satisfaction ensures that each person feels supported and confident in their journey to owning a home.',
        address: {
            line1: '102 Yonge St',
            line2: 'Toronto, ON M5C 2W1'
        }
    },
    {
        _id: 'emp9',
        name: 'Andrew Williams',
        image: emp9,
        speciality: 'Savings and Checking Accounts',
        position: 'Account Manager',
        degree: 'MSc',
        experience: '1 Years',
        about: 'With a thorough understanding of personal finance management, Andrew has helped countless individuals and families build stronger financial foundations. Specializing in savings and checking account services, Andrew is dedicated to educating clients on the best ways to manage their day-to-day finances while planning for the future. Their approachable style and knack for simplifying complex financial matters make them a go-to resource for customers seeking guidance on maximizing their financial potential.',
        address: {
            line1: '148 Spadina Ave',
            line2: 'Toronto, ON M5T 3E5'
        }
    },
    {
        _id: 'emp10',
        name: 'Jeffrey King',
        image: emp10,
        speciality: 'Credit Card Services',
        position: 'Credit Analyst',
        degree: 'MSc Fin',
        experience: '2 Years',
        about: 'A true advocate for smart financial habits, Jeffrey specializes in helping clients get the most from their credit cards. From explaining rewards programs to providing strategies for managing debt, they focus on making credit work for their clients rather than against them. Jeffrey is driven by a desire to educate and assist, helping clients make informed decisions about their credit use with confidence and clarity.',
        address: {
            line1: '1350 Lakeshore Blvd W',
            line2: 'Toronto, ON M6K 3G4'
        }
    },
    {
        _id: 'emp11',
        name: 'Zoe Kelly',
        image: emp11,
        speciality: 'Business Banking Solutions',
        position: 'Business Banker',
        degree: 'MBA',
        experience: '4 Years',
        about: 'Zoe is an experienced professional in the world of business banking, providing innovative and reliable financial solutions for companies of all sizes. From helping startups with their banking needs to supporting established businesses with advanced financial strategies, Zoe takes pride in fostering long-term business growth. Their expertise in streamlining business finances and offering custom banking advice makes them an essential partner for entrepreneurs and business owners.',
        address: {
            line1: '75 University Ave',
            line2: 'Toronto, ON M5J 2C5'
        }
    },
    {
        _id: 'emp12',
        name: 'Dhruv Talia',
        image: emp12,
        speciality: 'Savings and Checking Accounts',
        position: 'Account Manager',
        degree: 'MBA',
        experience: '4 Years',
        about: 'Dhruv is a trusted expert in personal finance, specializing in helping clients manage their savings and checking accounts effectively. They are passionate about helping customers achieve financial stability by offering practical solutions and sound advice. Whether it’s setting up a new account or optimizing existing ones, Dhruv ensures every client receives the guidance they need to manage their day-to-day finances with ease.',
        address: {
            line1: '2000 Eglinton Ave W',
            line2: 'Toronto, ON M6E 2K5'
        }
    },
    {
        _id: 'emp13',
        name: 'Chloe Evans',
        image: emp13,
        speciality: 'Personal Loans',
        position: 'Loan Officer',
        degree: 'MBA',
        experience: '4 Years',
        about: 'With a focus on personalized service, Chole is passionate about guiding clients through the often complex world of personal loans. Their goal is to make borrowing easier and more accessible, ensuring that each client finds the loan that perfectly fits their needs. Chole’s approachable and patient demeanor puts clients at ease, whether they’re consolidating debt, funding a personal project, or making a big purchase.',
        address: {
            line1: '300 Queen St E',
            line2: 'Toronto, ON M5A 1T6'
        }
    },
    {
        _id: 'emp14',
        name: 'Ryan Martinez',
        image: emp14,
        speciality: 'Credit Card Services',
        position: 'Credit Analyst',
        degree: 'MCom',
        experience: '3 Years',
        about: 'Ryan is a seasoned credit specialist who loves helping clients unlock the full potential of their credit card benefits. Whether its advising on the best rewards programs, helping clients improve their credit score, or navigating interest rates, Ryan makes the credit card process simple and transparent. Their commitment to responsible credit use and personalized service makes them a valuable resource for every customer.',
        address: {
            line1: '400 Bloor St W',
            line2: 'Toronto, ON M5S 1X4'
        }
    },
    {
        _id: 'emp15',
        name: 'Amelia Hill',
        image: emp15,
        speciality: 'Savings and Checking Accounts',
        position: 'Account Manager',
        degree: 'MSc',
        experience: '1 Years',
        about: 'Amelia is dedicated to simplifying the financial lives of clients by offering expert guidance on savings and checking accounts. With a focus on financial wellness, they help clients build healthy habits for saving and managing day-to-day expenses. Amelia is known for their friendly, approachable style and knack for providing clear, actionable advice that empowers clients to stay on top of their finances.',
        address: {
            line1: '900 Richmond St W',
            line2: 'Toronto, ON M6J 1C2'
        }
    },
]