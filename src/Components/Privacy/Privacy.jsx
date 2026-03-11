import React from 'react'
import style from './Privacy.module.css'
export default function Privacy() {
    return (
        <>

            <main className={`${style.main_content}`} >
                <div className={`${style.content_wrapper}`}>

                    <article className={`${style.article}`}>

                        <section className={`${style.hero_section}`}>
                            <div className={`${style.hero_section_child}`}>
                                <div className={`${style.hero_icon}`}>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <h1>Privacy Policy</h1>
                            </div>
                            <p className={`${style.effective_date}`}>Effective Date: March 6, 2026</p>
                        </section>


                        <section id='introduction' className={`${style.content_section}`} >
                            <h2>1. Introduction</h2>
                            <div className={`${style.section_content}`} >
                                <p>Welcome to Namaa. We are committed to protecting your privacy and handling your data with transparency and care. This Privacy Policy explains how Namaa ("we," "us," or "our") collects, uses, stores, and protects information when you use our data analytics platform.</p>
                                <p>Namaa is a SaaS analytics platform that allows businesses to connect their databases to generate insights, analytics, and dashboards from their operational data. We understand the sensitive nature of database access and are committed to maintaining the highest standards of security and privacy.</p>
                                <p>By using Namaa, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this policy, please do not use our services.</p>
                            </div>
                        </section>


                        <section id='Information' className={`${style.content_section}`}>
                            <h2>2. Information We Collect</h2>
                            <div className={`${style.cards_container}`}>

                                <div className={`${style.info_card} ${style.card_purple}`}>
                                    <h3>2.1 Account Information</h3>
                                    <p>When you create a Namaa account, we collect:</p>
                                    <ul className={`${style.bullet_list}`}>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Full name</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Email address</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Company name</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Password (encrypted and hashed)</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Billing and payment information</li>
                                    </ul>
                                </div>


                                <div className={`${style.info_card} ${style.card_purple_mid}`} >
                                    <h3>2.2 Usage Data</h3>
                                    <p>We automatically collect information about how you interact with our platform:</p>
                                    <ul className={`${style.bullet_list}`}>
                                        <li><span className={`${style.bullet} ${style.purple_mid}`}></span>IP address and device information</li>
                                        <li><span className={`${style.bullet} ${style.purple_mid}`}></span>Browser type and version</li>
                                        <li><span className={`${style.bullet} ${style.purple_mid}`}></span>Time and date of visits</li>
                                    </ul>
                                </div>


                                <div className={`${style.info_card} ${style.card_purple_light}`}>
                                    <h3>2.3 Communication Data</h3>
                                    <p>If you contact our support team or communicate with us, we collect the content of your communications, including email correspondence, support tickets, and feedback.</p>
                                </div>
                            </div>
                        </section>


                        <section id='database' className={`${style.content_section}`}>
                            <h2>3. Database Connection Information</h2>


                            <div className={`${style.security_banner}`}>
                                <div className={`${style.security_icon}`}>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className={`${style.security_content}`}>
                                    <h3>Critical Security Information</h3>
                                    <p>To provide our analytics services, you may choose to connect your database to Namaa. This requires you to manually provide database credentials, which we treat with the utmost security and care.</p>
                                </div>
                            </div>

                            <div className={`${style.database_credentials}`}>
                                <h3>3.1 Database Credentials Collected</h3>
                                <p>When you connect your database, we collect:</p>
                                <div className={`${style.credentials_grid}`}>
                                    <div className={`${style.credential_item}`} >
                                        <p className={`${style.credential_label}`}>Database Type</p>
                                        <p className={`${style.credential_value}`}>PostgreSQL, MySQL, SQL Server, MariaDB</p>
                                    </div>
                                    <div className={`${style.credential_item}`}>
                                        <p className={`${style.credential_label}`}>Database Host</p>
                                        <p className={`${style.credential_value}`}>Server address or IP</p>
                                    </div>
                                    <div className={`${style.credential_item}`}>
                                        <p className={`${style.credential_label}`}>Port Number</p>
                                        <p className={`${style.credential_value}`}>Database server port</p>
                                    </div>
                                    <div className={`${style.credential_item}`}>
                                        <p className={`${style.credential_label}`}>Database Name</p>
                                        <p className={`${style.credential_value}`}>Specific database to connect</p>
                                    </div>
                                    <div className={`${style.credential_item}`}>
                                        <p className={`${style.credential_label}`}>Username</p>
                                        <p className={`${style.credential_value}`}>Database user credentials</p>
                                    </div>
                                    <div className={`${style.credential_item}`}>
                                        <p className={`${style.credential_label}`}>Password</p>
                                        <p className={`${style.credential_value}`}>Encrypted authentication</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`${style.operational_data}`}>
                                <h3>3.2 Operational Data</h3>
                                <p>Once connected, we access data from your database solely for the purpose of generating analytics and insights. This may include:</p>
                                <ul className={`${style.bullet_list}`}>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Table and column metadata (schema information)</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Business data from your selected tables</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Aggregated statistics and metrics</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Data relationships and patterns for analysis</li>
                                </ul>
                            </div>
                        </section>


                        <section id='how_we_use' className={`${style.content_section}`}>
                            <h2>4. How We Use the Information</h2>
                            <p className={`${style.section_intro}`} >We use the information we collect for the following purposes:</p>

                            <div className={`${style.use_cases}`}>
                                <div className={`${style.use_case}`}>
                                    <div className={`${style.use_case_icon} ${style.blue}`}>
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2.5 4.16602C2.5 2.7853 5.85786 1.66602 10 1.66602C14.1421 1.66602 17.5 2.7853 17.5 4.16602C17.5 5.54673 14.1421 6.66602 10 6.66602C5.85786 6.66602 2.5 5.54673 2.5 4.16602Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.5 4.16602V15.8327C2.5 16.4957 3.29018 17.1316 4.6967 17.6004C6.10322 18.0693 8.01088 18.3327 10 18.3327C11.9891 18.3327 13.8968 18.0693 15.3033 17.6004C16.7098 17.1316 17.5 16.4957 17.5 15.8327V4.16602" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.5 10C2.5 10.663 3.29018 11.2989 4.6967 11.7678C6.10322 12.2366 8.01088 12.5 10 12.5C11.9891 12.5 13.8968 12.2366 15.3033 11.7678C16.7098 11.2989 17.5 10.663 17.5 10" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.use_case_content}`}>
                                        <h3>4.1 Provide Analytics Services</h3>
                                        <p>Database credentials and operational data are used exclusively to connect to your database, retrieve data, and generate analytics, insights, dashboards, and visualizations for your business.</p>
                                    </div>
                                </div>

                                <div className={`${style.use_case}`}>
                                    <div className={`${style.use_case_icon} ${style.purple}`} >
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6668 10.8331C16.6668 14.9997 13.7502 17.0831 10.2835 18.2914C10.102 18.3529 9.90478 18.35 9.72516 18.2831C6.25016 17.0831 3.3335 14.9997 3.3335 10.8331V4.99972C3.3335 4.77871 3.42129 4.56675 3.57757 4.41047C3.73385 4.25419 3.94582 4.16639 4.16683 4.16639C5.8335 4.16639 7.91683 3.16639 9.36683 1.89972C9.54337 1.74889 9.76796 1.66602 10.0002 1.66602C10.2324 1.66602 10.457 1.74889 10.6335 1.89972C12.0918 3.17472 14.1668 4.16639 15.8335 4.16639C16.0545 4.16639 16.2665 4.25419 16.4228 4.41047C16.579 4.56675 16.6668 4.77871 16.6668 4.99972V10.8331Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.use_case_content}`}>
                                        <h3>4.2 Maintain and Improve Services</h3>
                                        <p>We use usage data to monitor platform performance, identify bugs, improve user experience, and develop new features and capabilities.</p>
                                    </div>
                                </div>

                                <div className={`${style.use_case}`}>
                                    <div className={`${style.use_case_icon} ${style.green}`}>
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5C4.11595 12.5 3.2681 12.8512 2.64298 13.4763C2.01786 14.1014 1.66667 14.9493 1.66667 15.8333V17.5" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18.3335 17.4991V15.8324C18.3329 15.0939 18.0871 14.3764 17.6346 13.7927C17.1821 13.209 16.5486 12.7921 15.8335 12.6074" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.3335 2.60742C14.0505 2.79101 14.686 3.20801 15.1399 3.79268C15.5937 4.37735 15.84 5.09645 15.84 5.83659C15.84 6.57673 15.5937 7.29582 15.1399 7.8805C14.686 8.46517 14.0505 8.88217 13.3335 9.06576" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.use_case_content}`}>
                                        <h3>4.3 Customer Support</h3>
                                        <p>Account and communication data help us respond to your inquiries, provide technical support, and resolve issues with your account or database connection.</p>
                                    </div>
                                </div>

                                <div className={`${style.use_case}`}>
                                    <div className={`${style.use_case_icon} ${style.orange}`}>
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6665 3.33398H3.33317C2.4127 3.33398 1.6665 4.08018 1.6665 5.00065V15.0007C1.6665 15.9211 2.4127 16.6673 3.33317 16.6673H16.6665C17.587 16.6673 18.3332 15.9211 18.3332 15.0007V5.00065C18.3332 4.08018 17.587 3.33398 16.6665 3.33398Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18.3335 5.83398L10.8582 10.584C10.6009 10.7452 10.3034 10.8307 9.99984 10.8307C9.69624 10.8307 9.39878 10.7452 9.1415 10.584L1.6665 5.83398" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.use_case_content}`}>
                                        <h3>4.4 Communication</h3>
                                        <p>We may use your email to send service updates, security alerts, billing notifications, and important changes to our platform or policies. You can opt out of marketing communications.</p>
                                    </div>
                                </div>

                                <div className={`${style.use_case}`}>
                                    <div className={`${style.use_case_icon} ${style.red}`}>
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.8335 9.16602V5.83268C5.8335 4.72761 6.27248 3.66781 7.05388 2.8864C7.83529 2.105 8.89509 1.66602 10.0002 1.66602C11.1052 1.66602 12.165 2.105 12.9464 2.8864C13.7278 3.66781 14.1668 4.72761 14.1668 5.83268V9.16602" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.use_case_content}`}>
                                        <h3>4.5 Security and Compliance</h3>
                                        <p>We use collected information to protect against fraud, unauthorized access, and security threats, and to comply with legal and regulatory requirements.</p>
                                    </div>
                                </div>
                                <div className={`${style.use_case_last}`}>
                                    <p><strong>Important:</strong> We never modify, delete, or write data to your database. Our access is strictly read-only for analytics purposes.</p>
                                </div>
                            </div>
                        </section>


                        <section id='Data_security' className={`${style.content_section}`}>
                            <h2>5. Data Security and Encryption</h2>
                            <p className={`${style.section_intro}`}>We take data security extremely seriously and implement industry-leading measures to protect your information:</p>

                            <div className={`${style.security_measures}`}>
                                <div className={` ${style.security_measure_blue}`}>
                                    <div className={`${style.measure_icon1}`}>
                                       <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    </div>
                                    <div className={`${style.measure_content}`}>
                                        <h3>Credentials are encrypted</h3>
                                        <p>All database credentials are encrypted before being stored. Your passwords are never stored in plain text.</p>
                                    </div>
                                </div>

                                <div className={` ${style.security_measure_purple}`}>
                                    <div className={`${style.measure_icon2}`}>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.measure_content}`}>
                                        <h3>Secure connection to database</h3>
                                        <p>All connections to your database use SSL/TLS encryption. Data transmitted between your database and us is protected from interception.</p>
                                    </div>
                                </div>

                                <div className={` ${style.security_measure_green}`}>
                                    <div className={`${style.measure_icon3}`}>
                                        <i class="fa-regular fa-eye"></i>
                                    </div>
                                    <div className={`${style.measure_content}`}>
                                        <h3>Access Controls</h3>
                                        <p>We implement strict access controls and authentication mechanisms. Only authorized personnel can access systems containing customer data.</p>
                                    </div>
                                </div>
                                <div className={` ${style.security_measure_orange}`}>
                                    <div className={`${style.measure_icon4}`}>
                                       <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2.5 4.16602C2.5 2.7853 5.85786 1.66602 10 1.66602C14.1421 1.66602 17.5 2.7853 17.5 4.16602C17.5 5.54673 14.1421 6.66602 10 6.66602C5.85786 6.66602 2.5 5.54673 2.5 4.16602Z" stroke="#ffffff" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.5 4.16602V15.8327C2.5 16.4957 3.29018 17.1316 4.6967 17.6004C6.10322 18.0693 8.01088 18.3327 10 18.3327C11.9891 18.3327 13.8968 18.0693 15.3033 17.6004C16.7098 17.1316 17.5 16.4957 17.5 15.8327V4.16602" stroke="#ffffff" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.5 10C2.5 10.663 3.29018 11.2989 4.6967 11.7678C6.10322 12.2366 8.01088 12.5 10 12.5C11.9891 12.5 13.8968 12.2366 15.3033 11.7678C16.7098 11.2989 17.5 10.663 17.5 10" stroke="#ffffff" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className={`${style.measure_content}`}>
                                        <h3>Secure Infrastructure</h3>
                                        <p>Our infrastructure is hosted on secure, certified cloud providers with regular security audits and compliance certifications.</p>
                                    </div>
                                </div>

                                <div className={` ${style.security_measure_include}`}>
                                    <h3>5.1 Security Measures Include:</h3>



                                    <ul className={`${style.bullet_list}`}>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Regular security audits and penetration testing</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Multi-factor authentication for account access</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Employee security training and background checks</li>
                                        <li><span className={`${style.bullet} ${style.purple}`}></span>Incident response and disaster recovery procedures</li>
                                    </ul>

                                </div>
                            </div>

                        </section>

                        <section id='data_storing' className={`${style.content_section}`}>
                            <h2>6. Data Storing And Processing</h2>
                            <div className={`${style.section_content}`}>
                                <h3>6.1 Where We Store Data</h3>
                                <p className={`${style.section_content_p1}`}>Your data is stored on secure servers provided by industry-leading cloud infrastructure providers. </p>

                                <h3>6.2 Data Processing</h3>
                                <p>Data from your connected database is processed in secure, isolated environments. We use this data solely to:</p>
                                <ul className={`${style.bullet_list}`}>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Generate analytics, reports, and visualizations</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Create dashboards and insights for your business</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Train AI models to provide personalized recommendations (only with your explicit consent).</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Maintain cached copies for performance optimization</li>
                                </ul>
                                <h3>6.3 Data Synchronization</h3>
                                <p>We periodically synchronize data from your database to keep analytics up to date. You can control the synchronization frequency and pause or disconnect your database at any time from your account settings.</p>
                            </div>
                        </section>

                        <section id='datasharing' className={`${style.content_section}`}>
                            <h2>7. Data Sharing</h2>
                            <div className={`${style.section_content}`}>
                                <div className={`${style.security_banner}`}>
                                    <div className={`${style.security_icon}`}>
                                       <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    </div>
                                    <div className={`${style.security_content}`}>
                                        <h3>Our Commitment</h3>
                                        <p>We do not sell, rent, or share your data or database credentials with third parties for marketing purposes.</p>
                                    </div>
                                </div>
                                <p>We may share information only in the following limited circumstances:</p>
                                <h3>7.1 Service Providers</h3>
                                <p>We may share information with trusted third-party service providers who assist us in operating our platform, such as:</p>
                                <ul className={`${style.bullet_list}`}>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Cloud hosting and infrastructure providers</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Payment processors (only billing information, never database credentials)</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Email communication services</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Analytics and monitoring tools (anonymized usage data only)</li>
                                </ul>
                                <p>These service providers are contractually obligated to protect your data and use it only for the purposes we specify.</p>
                                <h3>7.2 Legal Requirements</h3>
                                <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas, or government regulations).</p>
                            </div>
                        </section>

                        <section id='dataRetention' className={`${style.content_section}`}>
                            <h2>8. Data Retention</h2>
                            <div className={`${style.section_content}`}>
                                <h3>8.1 Active Subscription</h3>
                                <p>We retain your account information and any connected database credentials while your subscription is active and you continue to use our services. During this time, synchronized data from your database may be stored in order to provide analytics, insights, and other platform features.</p>
                                <h3>8.2 Subscription Cancellation</h3>
                                <p>When you cancel your subscription, we will:</p>
                                <ul className={`${style.bullet_list}`}>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Your database connection will be disconnected and all data synchronization will stop.</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Access to analytics and platform features will be disabled at the end of the current billing period.</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Your database credentials will be permanently removed from our systems within 7 working days of cancellation.</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Any synchronized data associated with your account will be deleted within 30 days after the subscription ends.</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Billing and transaction records may be retained for a longer period where required for legal, financial, or compliance purposes.</li>
                                </ul>
                                <h3>8.3 Backups</h3>
                                <p>Backup copies of data may persist in our systems for up to 90 days after deletion but are not accessible for operational use and will be permanently deleted according to our backup retention schedule.</p>
                            </div>
                        </section>

                        <section id='Update_section' className={`${style.content_section}`}>
                            <h2>9. Updates To This Privacy Policy</h2>
                            <div className={`${style.section_content}`}>
                                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:</p>
                                <ul className={`${style.bullet_list}`}>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Update the "Effective Date" at the top of this policy</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Notify you via email if the changes are material or significant</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Display a notice on our platform when you next log in</li>
                                    <li><span className={`${style.bullet} ${style.purple}`}></span>Provide a summary of key changes</li>
                                </ul>
                                <p>Your continued use of Namaa after we make changes indicates your acceptance of the updated Privacy Policy. If you do not agree with the changes, you may discontinue using our services and request deletion of your account.</p>
                            </div>
                        </section>

                        <section id='contanct' className={`${style.content_section}`}>
                            <h2>10. Contact Info</h2>
                        </section>


                        <div className={`${style.question_banner}`}>
                            <div className={`${style.security_icon2}`}>
                                <i className={`fa-regular fa-envelope ${style.envelope_i}`}></i>
                            </div>

                            <div className={`${style.security_info}`}>
                                <h3>Questions About Your Privacy?</h3>
                                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please <a href="">Contact Us</a></p>
                            </div>

                        </div>
                        <div className={`${style.security_measure_include2}`}>
                            <p>We are committed to resolving any privacy concerns you may have and will respond to your inquiry within 5 business days.</p>

                        </div>
                    </article>


                    <aside className={`${style.sidebar}`}>
                        <div className={`${style.sidebar_header}`}>
                            <h3>On This Page</h3>
                        </div>
                        <nav className={`${style.sidebar_nav}`}>
                            <ol>
                                <li><a href="#introduction">Introduction</a></li>
                                <li><a href="#Information">Information We Collect</a></li>
                                <li><a href="#database">Database Connection Info</a></li>
                                <li><a href="#how_we_use">How We Use The Info</a></li>
                                <li><a href="#Data_security">Data Security and Encryption</a></li>
                                <li><a href="#data_storing">Data Storing And Processing</a></li>
                                <li><a href="#datasharing">Data Sharing</a></li>
                                <li><a href="#dataRetention">Data Retention</a></li>
                                <li><a href="#Update_section">Updates To This Privacy Policy</a></li>
                                <li><a href="#contanct">Contact Info</a></li>
                            </ol>
                        </nav>
                    </aside>
                </div>
            </main>




        </>
    )
}

