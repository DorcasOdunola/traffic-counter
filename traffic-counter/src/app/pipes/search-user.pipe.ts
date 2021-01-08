import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(userArray: any[], searchUser: any): unknown {
    searchUser = searchUser.toLowerCase();
    if (!searchUser) return userArray;
    let filteredUser = userArray.filter(user => 
      user.surname.toLowerCase().includes(searchUser) ||
      user.first_name.toLowerCase().includes(searchUser) ||
      user.last_name.toLowerCase().includes(searchUser) ||
      user.email.toLowerCase().includes(searchUser) ||
      user.address.toLowerCase().includes(searchUser) ||
      user.phone_number.toLowerCase().includes(searchUser) ||
      user.user_status.toLowerCase().includes(searchUser) ||
      user.unit_name.toLowerCase().includes(searchUser)
      )
    return filteredUser;
  }

}
