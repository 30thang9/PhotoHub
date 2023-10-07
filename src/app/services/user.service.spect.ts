import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/user.model';

describe('UserService', () => {
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], // Sử dụng HttpClientTestingModule để thay thế HttpClient trong kiểm thử
            providers: [UserService]
        });
        userService = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add a new user', () => {
        const newUser: User = {
            id: 1, username: 'newuser',
            password: '',
            full_name: '',
            email: '',
            phone_number: '',
            address: '',
            avatar: '',
            role_id: 0
        };

        // Kiểm tra xem có lỗi nào không
        userService.addUser(newUser).subscribe(
            (user) => {
                expect(user).toEqual(newUser); // Kiểm tra xem user được trả về có giống với user mới được thêm
            },
            (error) => {
                fail('Expected to add a new user, but got an error: ' + error);
            }
        );

        // Kiểm tra xem có một request PUT đúng địa chỉ API không
        const req = httpMock.expectOne('assets/json/users.json');
        expect(req.request.method).toEqual('PUT');

        // Trả về dữ liệu giả lập từ request PUT
        req.flush([newUser]);

        // Kết thúc request
        httpMock.verify();
    });
});
