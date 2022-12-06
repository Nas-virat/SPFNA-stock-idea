*** Settings ***
Library             SeleniumLibrary

*** Variables ***
${browser}          chrome
${check_url}        http://localhost:3000/login
${CorrectID}          Chanon
${CorrectPassword}    123456

*** Test Cases ***
TC_UI_00005 Profile
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${CorrectID}
    Input text    id=password-form   ${CorrectPassword}
    Click Element    id=btn-submit
    Wait Until Location Is    http://localhost:3000/home
    Click Element    id=My Profile
    Wait Until Location Is    http://localhost:3000/profile
    Page Should Contain    ${CorrectID}
    Close Browser