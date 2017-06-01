$(document).ready(function() {
    var sudoku = function() {

        var fieldInfo = {};
        var test = new Test();
        
        test.fillSudoku();
        prepareFields($('#field_00'));
        $('#solve-button').click(init);

        function init() {
            solve($('#field_00'));
        }

        function solve(currField) {
            var currID = currField.attr('id').slice(-2);
            if(fieldInfo[currID] === 'initial') {
                solve(nextField(currField));
                return;
            }
            for(var i = 1; i < 10; i++) {
                if (canWriteToField(i, currField)) {
                    console.log("writing to Field: " + currField.attr('id') + ", value: " + i);
                    currField.val(i);
                    solve(nextField(currField));
                }
            }
            currField.val('');
        }

        function nextField(currField) {
            var currID = currField.attr('id').slice(-2);
            var next;
            if(currID[1] < 8) {
                next = $('#field_' + currID[0] + (parseInt(currID[1]) + 1).toString());
            } else {
                next = $('#field_' + (parseInt(currID[0]) + 1).toString() + '0');
            }
            if(!next.length) return false;
            else return next;
        }

        function canWriteToField(value, field) {
            return !verticalCollision(value, field) &&
                   !horizontalCollision(value, field) &&
                   !squareCollision(value, field);
        }

        function verticalCollision(value, field) {
            var id = field.attr('id').slice(-2);
            for(var i = 1; i < 10; i++) {
                var currField = $('#field_' + i + id[1]);
                if(currField.val() == value) {
                    console.log("collision with number: " + value + " at " + currField.attr('id'));
                    return true;
                }
            }
            return false;
        }

        function horizontalCollision(value, field) {
            var id = field.attr('id').slice(-2);
            for(var i = 1; i < 10; i++) {
                var currField = $('#field_' + id[0] + i);
                if(currField.val() == value) {
                    console.log("collision with number: " + value + " at " + currField.attr('id'));
                    return true;
                }
            }
            return false;
        }

        function squareCollision(value, field) {
            var id = field.attr('id').slice(-2);
            var idRangeX = getIdRange(id[0]);
            var idRangeY = getIdRange(id[1]);

            for(var x of idRangeX)
                for(var y of idRangeY) {
                    currID = x.toString() + y.toString();
                    if(currID === id)
                        continue;
                    var currField = $('#field_' + currID);
                    if(currField.val() == value) {
                        console.log("collision with number: " + value + " at " + currID)
                        return true;
                    }
                }
            return false;
        }

        function getIdRange(id) {
            var id = parseInt(id);
            switch(id) {
                case 0:
                case 1:
                case 2:
                    return [0,1,2];
                case 3:
                case 4:
                case 5:
                    return [3,4,5];
                case 6:
                case 7:
                case 8:
                    return [6,7,8];
            }
        }

        function prepareFields(field) {
            console.log(field.attr('id'));
            var id = field.attr('id').slice(-2);

            if(field.val() !== '')
                fieldInfo[id] = 'initial';

            var next = nextField(field);
            if (!next || !prepareFields(next))
                return false;
        }
    }();
})
