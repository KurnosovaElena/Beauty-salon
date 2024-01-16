import React from "react";
import "./footer.css";

const contactsList = [
  {
    name: "ул. Чебби, д. 12, г. Минск",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "cherryberry.beauty@gmail.com",
    icon: "ri-mail-open-line",
  },
  {
    name: "+375 (33) 456-78-90",
    icon: "ri-phone-line",
  },
  {
    name: "cherryberry.beauty",
    icon: "ri-instagram-line",
  },
];

const contactsToBeRendered = contactsList;

export function Footer(props) {
  return (
    <>
      <footer>
        <div className="about">
          <h1>
            В нашем салоне
            <br /> красоты
          </h1>
          <p>
            вы сможете воспользоваться
            <br /> услугами:
          </p>
          <p>
            Перманентного макияжа, шугаринга,
            <br /> восковой депиляции, татуажа,
            <br /> окрашивания и ламинирования
            <br /> бровей, визажа, парикмахерскими
            <br /> услугами{" "}
          </p>
          <p>
            Мы заботимся о вашей красоте и<br /> здоровье, а также о вашем
            комфорте
            <br /> и удовольствии.{" "}
          </p>
          <p>
            Запишитесь на прием и убедитесь
            <br /> сами!
          </p>
        </div>
        <div className="logo-footer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="212"
            height="31"
            viewBox="0 0 212 31"
            fill="none"
          >
            <path
              d="M13.2998 29.76C10.8114 29.76 8.66116 29.1538 6.8492 27.9413C5.06138 26.7013 3.69638 25.0205 2.75415 22.8987C1.81193 20.7768 1.34082 18.3795 1.34082 15.7067C1.34082 12.9511 1.86026 10.4435 2.89911 8.18399C3.93797 5.89688 5.36338 4.10578 7.17535 2.81066C9.01147 1.48799 11.053 0.82666 13.2998 0.82666C15.4258 0.82666 17.2016 1.14355 18.627 1.77733C20.0524 2.38354 21.1396 3.18266 21.8885 4.17466C22.3234 4.80845 22.5892 5.59378 22.6858 6.53066C22.7824 7.46754 22.8307 8.77645 22.8307 10.4573H21.7436C21.2846 7.92221 20.4389 5.99333 19.2068 4.67066C17.9747 3.34799 16.3681 2.68666 14.387 2.68666C11.9227 2.68666 9.97786 3.67866 8.55244 5.66266C7.12702 7.64666 6.41432 10.9947 6.41432 15.7067C6.41432 19.2062 7.06663 22.1133 8.37125 24.428C9.67586 26.7427 11.6811 27.9 14.387 27.9C16.0781 27.9 17.6244 27.3902 19.0256 26.3707C20.4511 25.3512 21.5986 23.8907 22.4683 21.9893L23.7367 23.1053C22.5771 25.42 21.1759 27.1147 19.533 28.1893C17.8901 29.2365 15.8124 29.76 13.2998 29.76ZM27.3501 11.408C27.3501 10.2837 27.215 9.45706 26.9443 8.92799C26.6737 8.37688 26.1325 8.10133 25.3207 8.10133H25.0308V7.10933H28.5098C29.2056 7.10933 29.7372 7.24159 30.1043 7.50613C30.4716 7.77066 30.7325 8.21154 30.8871 8.82879C31.0418 9.42399 31.119 10.2837 31.119 11.408V16.864H38.9467V7.10933H42.7156V24.6347C42.7156 25.7589 42.851 26.5965 43.1215 27.1477C43.3922 27.6768 43.9333 27.9413 44.745 27.9413H45.0349V28.9333H41.556C40.8602 28.9333 40.3287 28.812 39.9614 28.5696C39.5943 28.3051 39.3334 27.8752 39.1787 27.28C39.0241 26.6627 38.9467 25.781 38.9467 24.6347V18.352H31.119V28.9333H27.3501V11.408ZM48.216 11.408C48.216 10.2837 48.0808 9.45706 47.8101 8.92799C47.5396 8.37688 46.9984 8.10133 46.1866 8.10133H45.8967V7.10933H58.6819C60.3248 7.10933 61.1462 7.99111 61.1462 9.75466V12.5653H60.2765C60.2765 11.1986 59.9673 10.1955 59.3487 9.55626C58.7497 8.91698 57.851 8.59733 56.6525 8.59733H51.9849V16.864H59.5227V18.352H51.9849V27.4453H56.9424C58.0441 27.4453 58.9622 27.1698 59.6966 26.6187C60.4312 26.0456 61.04 25.0645 61.5231 23.6757L62.3059 24.0064L61.4651 26.6187C61.214 27.4123 60.9143 27.9965 60.5664 28.3712C60.2185 28.7459 59.6774 28.9333 58.9429 28.9333H48.216V11.408ZM79.0807 29.264C78.0176 29.264 77.0513 28.9112 76.1815 28.2059C75.3118 27.4784 74.4035 26.2328 73.4563 24.4693L70.5572 18.9472H69.3975V28.9333H65.5997V11.408C65.5997 10.2837 65.4643 9.45706 65.1938 8.92799C64.9232 8.37688 64.382 8.10133 63.5702 8.10133H63.2803V7.10933H71.282C73.292 7.10933 75.0992 7.52818 76.7034 8.36586C78.3075 9.20354 79.1097 10.8128 79.1097 13.1936C79.1097 15.9491 77.5441 17.7788 74.413 18.6827L77.4572 24.4693C78.5974 26.6517 79.7959 27.8642 81.0521 28.1067V28.9333C80.8975 29.0216 80.6172 29.0987 80.2113 29.1648C79.8055 29.2309 79.4286 29.264 79.0807 29.264ZM71.137 17.6245C72.2193 17.6245 73.1374 17.2608 73.8912 16.5333C74.6644 15.7838 75.0509 14.6155 75.0509 13.0283C75.0509 11.4631 74.674 10.3058 73.9202 9.55626C73.1664 8.80674 72.2871 8.43199 71.282 8.43199C70.7215 8.43199 70.2867 8.47608 69.9774 8.56426L69.3975 8.66346V17.6245H71.137ZM96.9456 29.264C95.8825 29.264 94.9162 28.9112 94.0464 28.2059C93.1767 27.4784 92.2682 26.2328 91.3212 24.4693L88.4221 18.9472H87.2624V28.9333H83.4645V11.408C83.4645 10.2837 83.3292 9.45706 83.0587 8.92799C82.788 8.37688 82.2469 8.10133 81.4351 8.10133H81.1452V7.10933H89.1469C91.1569 7.10933 92.964 7.52818 94.5683 8.36586C96.1724 9.20354 96.9746 10.8128 96.9746 13.1936C96.9746 15.9491 95.409 17.7788 92.2779 18.6827L95.322 24.4693C96.4623 26.6517 97.6606 27.8642 98.917 28.1067V28.9333C98.7622 29.0216 98.4821 29.0987 98.0762 29.1648C97.6704 29.2309 97.2935 29.264 96.9456 29.264ZM89.0019 17.6245C90.0842 17.6245 91.0023 17.2608 91.7561 16.5333C92.5291 15.7838 92.9158 14.6155 92.9158 13.0283C92.9158 11.4631 92.5389 10.3058 91.7851 9.55626C91.0313 8.80674 90.1518 8.43199 89.1469 8.43199C88.5863 8.43199 88.1514 8.47608 87.8423 8.56426L87.2624 8.66346V17.6245H89.0019ZM106.239 20.2037L101.108 11.408C100.528 10.4601 99.89 9.63341 99.1942 8.92799C98.5176 8.22258 97.8702 7.83679 97.2518 7.77066V7.10933H100.412C101.398 7.10933 102.287 7.46205 103.079 8.16746C103.891 8.87288 104.577 9.73261 105.137 10.7467L109.08 17.5253L114.705 7.10933H116.589L110.008 19.3109V28.9333H106.239V20.2037ZM120.081 7.02666C120.081 5.62133 119.912 4.58799 119.574 3.92666C119.235 3.23778 118.559 2.89333 117.544 2.89333H117.182V1.65332H126.966C130.011 1.65332 132.547 2.13554 134.577 3.09999C136.63 4.06445 137.657 5.99333 137.657 8.88666C137.657 10.1542 137.21 11.3529 136.316 12.4827C135.446 13.5849 134.214 14.3702 132.62 14.8387C136.703 15.3071 138.744 17.484 138.744 21.3693C138.744 24.2352 137.742 26.2192 135.736 27.3213C133.731 28.396 131.17 28.9333 128.054 28.9333H120.081V7.02666ZM127.51 14.012C129.08 14.012 130.313 13.5987 131.206 12.772C132.125 11.9178 132.583 10.5538 132.583 8.67999C132.583 6.77866 132.04 5.41466 130.953 4.58799C129.89 3.73378 128.561 3.30666 126.966 3.30666C126.314 3.30666 125.807 3.36178 125.444 3.47199L124.792 3.59599V14.012H127.51ZM127.51 27.28C129.515 27.28 131.037 26.784 132.076 25.792C133.139 24.8 133.671 23.3947 133.671 21.576C133.671 17.7733 131.617 15.872 127.51 15.872H124.792V26.8667C125.058 26.9768 125.299 27.0458 125.517 27.0733C126.048 27.2112 126.652 27.28 127.329 27.28H127.51ZM142.714 11.408C142.714 10.2837 142.579 9.45706 142.309 8.92799C142.038 8.37688 141.497 8.10133 140.685 8.10133H140.395V7.10933H153.18C154.823 7.10933 155.645 7.99111 155.645 9.75466V12.5653H154.775C154.775 11.1986 154.466 10.1955 153.847 9.55626C153.248 8.91698 152.349 8.59733 151.151 8.59733H146.483V16.864H154.021V18.352H146.483V27.4453H151.441C152.542 27.4453 153.461 27.1698 154.195 26.6187C154.929 26.0456 155.538 25.0645 156.021 23.6757L156.804 24.0064L155.963 26.6187C155.712 27.4123 155.413 27.9965 155.065 28.3712C154.717 28.7459 154.176 28.9333 153.441 28.9333H142.714V11.408ZM173.579 29.264C172.516 29.264 171.549 28.9112 170.68 28.2059C169.81 27.4784 168.902 26.2328 167.955 24.4693L165.055 18.9472H163.896V28.9333H160.098V11.408C160.098 10.2837 159.963 9.45706 159.692 8.92799C159.421 8.37688 158.88 8.10133 158.068 8.10133H157.779V7.10933H165.78C167.79 7.10933 169.597 7.52818 171.202 8.36586C172.806 9.20354 173.608 10.8128 173.608 13.1936C173.608 15.9491 172.042 17.7788 168.911 18.6827L171.955 24.4693C173.096 26.6517 174.294 27.8642 175.55 28.1067V28.9333C175.396 29.0216 175.115 29.0987 174.71 29.1648C174.304 29.2309 173.927 29.264 173.579 29.264ZM165.635 17.6245C166.718 17.6245 167.636 17.2608 168.389 16.5333C169.163 15.7838 169.549 14.6155 169.549 13.0283C169.549 11.4631 169.172 10.3058 168.418 9.55626C167.665 8.80674 166.785 8.43199 165.78 8.43199C165.22 8.43199 164.785 8.47608 164.476 8.56426L163.896 8.66346V17.6245H165.635ZM191.443 29.264C190.381 29.264 189.414 28.9112 188.544 28.2059C187.674 27.4784 186.767 26.2328 185.819 24.4693L182.92 18.9472H181.76V28.9333H177.963V11.408C177.963 10.2837 177.827 9.45706 177.557 8.92799C177.286 8.37688 176.745 8.10133 175.933 8.10133H175.643V7.10933H183.645C185.656 7.10933 187.462 7.52818 189.066 8.36586C190.671 9.20354 191.472 10.8128 191.472 13.1936C191.472 15.9491 189.907 17.7788 186.776 18.6827L189.82 24.4693C190.961 26.6517 192.159 27.8642 193.415 28.1067V28.9333C193.261 29.0216 192.98 29.0987 192.574 29.1648C192.168 29.2309 191.791 29.264 191.443 29.264ZM183.5 17.6245C184.583 17.6245 185.5 17.2608 186.254 16.5333C187.027 15.7838 187.413 14.6155 187.413 13.0283C187.413 11.4631 187.037 10.3058 186.283 9.55626C185.529 8.80674 184.65 8.43199 183.645 8.43199C183.085 8.43199 182.65 8.47608 182.34 8.56426L181.76 8.66346V17.6245H183.5ZM200.737 20.2037L195.605 11.408C195.025 10.4601 194.388 9.63341 193.692 8.92799C193.016 8.22258 192.369 7.83679 191.749 7.77066V7.10933H194.91C195.895 7.10933 196.785 7.46205 197.577 8.16746C198.388 8.87288 199.075 9.73261 199.635 10.7467L203.578 17.5253L209.202 7.10933H211.087L204.506 19.3109V28.9333H200.737V20.2037Z"
              fill="#590B11"
            />
          </svg>
          <div className="logo-line-footer"></div>
        </div>
        <div className="contacts-footer">
          <h1>Контакты</h1>
          <div className="list-of-contacts">
            {contactsToBeRendered.map((contacts, index1) => {
              return (
                <div key={index1} className="cont">
                  <i className={contacts.icon}></i>
                  <p className="p-contacts">{contacts.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
